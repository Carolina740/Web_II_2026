import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://bfuhmrivpfsgebueiobx.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_4lhdO9EQ2zFFLxkeTYH-iw_LUMnA1o-'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
