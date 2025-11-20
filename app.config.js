import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "src/env/.env.development"),
});

export default {
  expo: {
    extra: {
      databaseUrl: process.env.DATABASE_URL,
      supabaseKey: process.env.PUBLIC_ANON,
      supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      DISCOVERY_API_URL: process.env.DISCOVERY_API_URL,
      DISCOVERY_API_KEY: process.env.DISCOVERY_API_KEY,
      DISCOVERY_API_SECRET: process.env.DISCOVERY_API_SECRET,
    },
  },
};
