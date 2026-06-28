import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase;
if (!supabaseUrl || !supabaseAnonKey) {
  const emptyResult = { data: null, error: null };

  function makeChainable() {
    const obj = {
      select() {
        return obj;
      },
      eq() {
        return obj;
      },
      order() {
        return obj;
      },
      single() {
        return obj;
      },
      async upsert() {
        return { data: null, error: null };
      },
      async insert() {
        return { data: null, error: null };
      },
      async delete() {
        return { data: null, error: null };
      },
      then(onFulfilled, onRejected) {
        return Promise.resolve(emptyResult).then(onFulfilled, onRejected);
      },
    };
    return obj;
  }

  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithOtp: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({}),
    },
    from: () => makeChainable(),
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
