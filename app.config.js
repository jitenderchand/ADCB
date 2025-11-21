import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "src/env/.env.development"),
});

export default {
  name: "citypulse",
  slug: "citypulse",
  version: "1.0.0",
  icon: "./assets/icon.png",
  orientation: "portrait",
  android: {
    package: "com.adcb.citypulse",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },
  ios: {
    bundleIdentifier: "com.adcb.citypulse",
  },
  plugins: [
    "expo-font",
    [
      "expo-splash-screen",
      {
        image: "./assets/icon.png",
        resizeMode: "cover",
        backgroundColor: "#000000",
        // optional:
        android: {
          statusBarTranslucent: true,
        },
      },
    ],
  ],
  extra: {
    databaseUrl: process.env.DATABASE_URL,
    supabaseKey: process.env.PUBLIC_ANON,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DISCOVERY_API_URL: process.env.DISCOVERY_API_URL,
    DISCOVERY_API_KEY: process.env.DISCOVERY_API_KEY,
    DISCOVERY_API_SECRET: process.env.DISCOVERY_API_SECRET,
  },
};
