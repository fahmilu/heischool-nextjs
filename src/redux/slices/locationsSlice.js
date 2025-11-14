import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch locations from API
// This uses the internal Next.js API route which fetches from the external API
export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/locations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Alternative: Fetch directly from external API (if needed)
export const fetchLocationsDirectly = createAsyncThunk(
  'locations/fetchLocationsDirectly',
  async (_, { rejectWithValue }) => {
    try {
      // Get base API URL from environment variable
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://staging.heischools.co.id/api';
      const apiUrl = `${apiBaseUrl}/locations`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch locations from external API');
      }
      
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    data: [],
    loading: false,
    error: null,
    selectedLocation: null,
  },
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    clearSelectedLocation: (state) => {
      state.selectedLocation = null;
    },
    setLocations: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchLocations (via internal API route)
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch locations';
      })
      // Handle fetchLocationsDirectly (direct external API call)
      .addCase(fetchLocationsDirectly.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationsDirectly.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchLocationsDirectly.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch locations from external API';
      });
  },
});

export const { setSelectedLocation, clearSelectedLocation, setLocations } = locationsSlice.actions;

// Selectors
export const selectAllLocations = (state) => state.locations.data;
export const selectLocationsLoading = (state) => state.locations.loading;
export const selectLocationsError = (state) => state.locations.error;
export const selectSelectedLocation = (state) => state.locations.selectedLocation;
export const selectLocationBySlug = (slug) => (state) => 
  state.locations.data.find((location) => location.slug === slug);

export default locationsSlice.reducer;

