import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://obvmhbcltyezuxenhyeq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9idm1oYmNsdHllenV4ZW5oeWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNTY0MDYsImV4cCI6MjA0NzgzMjQwNn0.g7zOykkc6an0oXWg_s4WawuHSJjzEZRob7tMiBSoBnk'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anon key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  db: {
    schema: 'public'
  }
})