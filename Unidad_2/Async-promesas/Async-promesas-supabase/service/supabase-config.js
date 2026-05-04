export const SUPABASE_URL = 'https://bfuhmrivpfsgebueiobx.supabase.co/rest/v1';
export const SUPABASE_ANON_KEY = 'sb_publishable_4lhdO9EQ2zFFLxkeTYH-iw_LUMnA1o-';

export const headers = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};
