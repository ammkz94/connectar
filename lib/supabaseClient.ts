console.log('[DEBUG] NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('[DEBUG] NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

import { createClient } from '@supabase/supabase-js';

import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Define types for the mock client
interface MockResponse {
  error: { message: string; code: string } | null;
  data: null; // In a real scenario, this would be T[] | null for some generic T
  status: number;
  statusText: string;
  count: number | null;
}

interface MockSupabaseQueryExecutor {
  select: (query?: string, options?: object) => Promise<MockResponse>;
  insert: (values: object | object[], options?: object) => Promise<MockResponse>;
  update: (values: object, options?: object) => Promise<MockResponse>;
  delete: (options?: object) => Promise<MockResponse>;
  eq: (column: string, value: unknown) => MockSupabaseQueryExecutor;
  order: (column: string, options?: object) => MockSupabaseQueryExecutor;
  limit: (count: number) => MockSupabaseQueryExecutor;
}

interface MockSupabaseClient {
  from: (table: string) => MockSupabaseQueryExecutor;
}

let supabase: SupabaseClient | MockSupabaseClient;

const mockErrorResponseData: MockResponse = {
  error: { message: 'Supabase is not configured. Please check environment variables.', code: 'SUPABASE_NOT_CONFIGURED' },
  data: null,
  status: 503,
  statusText: 'Service Unavailable',
  count: null
};

// Check if supabaseUrl and supabaseAnonKey are defined and not the placeholder
if (supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://example.com") {
  // If they are defined and not placeholders, use them to create the Supabase client
  // The non-null assertion operator (!) is used here because we've already checked
  // that supabaseUrl and supabaseAnonKey are not null or undefined.
  supabase = createClient(supabaseUrl!, supabaseAnonKey!);
} else {
  // If they are not defined or are placeholders, log a warning and use the mock client
  console.warn(
    '⚠️ Supabase environment variables are missing or are placeholder values. Using a mock Supabase client. ' +
    'Functionality requiring Supabase will return mock error responses. ' +
    'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment for full functionality.'
  );

  const mockQueryExecutor: MockSupabaseQueryExecutor = {
    select: async () => Promise.resolve({ ...mockErrorResponseData }),
    insert: async () => Promise.resolve({ ...mockErrorResponseData }),
    update: async () => Promise.resolve({ ...mockErrorResponseData }),
    delete: async () => Promise.resolve({ ...mockErrorResponseData }),
    eq: function() { return this; },
    order: function() { return this; },
    limit: function() { return this; },
  };

  supabase = {
    from: (table: string): MockSupabaseQueryExecutor => { // Added return type for clarity
      console.log(`Mock Supabase: from(${table}) called`);
      return mockQueryExecutor;
    }
  };
}

export { supabase };
