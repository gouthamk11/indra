import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { valid: false, error: 'API key is required' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { valid: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    // Query the database to check if the API key exists
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, type, key')
      .eq('key', apiKey)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { valid: false, error: 'Database error occurred' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { valid: false, error: 'Invalid API key' },
        { status: 401 }
      );
    }

    // API key is valid
    return NextResponse.json({
      valid: true,
      message: 'API key is valid',
      keyInfo: {
        id: data.id,
        name: data.name,
        type: data.type
      }
    });

  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
