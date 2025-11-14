import { NextResponse } from 'next/server';

// Get base API URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://staging.heischools.co.id/api';
const EXTERNAL_API_URL = `${API_BASE_URL}/locations`;

export async function GET() {
  try {
    // Fetch from external API
    const response = await fetch(EXTERNAL_API_URL, {
      cache: 'no-store', // Disable cache for fresh data, or use 'force-cache' for caching
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`External API returned ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data.data || data // Handle different response formats
    });
  } catch (error) {
    console.error('Failed to fetch locations from external API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch locations',
        message: error.message
      },
      { status: 500 }
    );
  }
}

