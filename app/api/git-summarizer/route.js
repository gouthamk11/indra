import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { summarizeReadmeWithLangChain } from '../../../lib/chain';

export async function POST(request) {
  try {
    const { githubUrl } = await request.json();
    const apiKey = request.headers.get('x-api-key');

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
    const readmeContent = await getReadmeContent(githubUrl);
    console.log(readmeContent);

    const summary = await summarizeReadmeWithLangChain(readmeContent);
    console.log(summary);
    // API key is valid
    return NextResponse.json({
      message: 'Github Summarizer API is working',
      githubUrl: githubUrl,
      summary: summary
    });

  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


async function getReadmeContent(githubUrl) {
  try {
    // Extract owner and repo from the GitHub URL
    // Example: https://github.com/owner/repo
    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)(\/|$)/);
    if (!match) {
      throw new Error('Invalid GitHub URL');
    }
    const owner = match[1];
    const repo = match[2];

    // Try to fetch README from main or master branch
    const branches = ['main', 'master'];
    let readmeResponse, readmeContent = null;

    for (const branch of branches) {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
      readmeResponse = await fetch(url);
      if (readmeResponse.ok) {
        readmeContent = await readmeResponse.text();
        break;
      }
    }

    if (!readmeContent) {
      throw new Error('README.md not found in main or master branch');
    }

    return readmeContent;
  } catch (err) {
    console.error('Error fetching README:', err);
    return null;
  }
}



