import { createClient } from '@supabase/supabase-js';
import config from '../config.json';

const {SUPABASE_SERVER} = config;
const {SUPABASE_KEY} = config;
const API = createClient(SUPABASE_SERVER, SUPABASE_KEY);

export default API;
