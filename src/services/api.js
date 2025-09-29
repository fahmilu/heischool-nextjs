export const fetchData = async (url) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        next: {
            revalidate: 60,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json().then(data => {
        return data;
      });
    } catch (error) {
      console.log({error});
      throw error;
    }
};

export const fetchPageData = async (slug) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/${slug}`, {
            next: {
                revalidate: 60,
            },
        });
        return await response.json().then(data => {
            return data;
        });
    } catch (error) {
        console.log({error});
        throw error;
    }
};

export const getData = async (endpoint) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
            next: {
                revalidate: 60,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.log({error});
        throw error;
    }
};

export const pushData = async (endpoint, data) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to push data');
        }
        
        return await response.json();
    } catch (error) {
        console.log({error});
        throw error;
    }
};
