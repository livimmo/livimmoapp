// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tgickcvosqpidpqqgzhy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnaWNrY3Zvc3FwaWRwcXFnemh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzY4MjMsImV4cCI6MjA1MDU1MjgyM30.hENovMpO_vJywEMQzbA3ITM99xkKjDXF118p3l_q4kw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);