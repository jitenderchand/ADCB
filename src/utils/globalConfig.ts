import Constants from "expo-constants";

export interface IConfig {
  googleMapKey: string;
  getApiUrlFromRoot: (relativePath: string) => string;
  getSupabaseUrl: () => string;
  PUBLIC_ANON: string;
}

const getSupabaseUrl = () => {
  return `${Constants.expoConfig?.extra?.databaseUrl}`;
};

const getApiUrlFromRoot = (relativePath: string) => {
  return `${Constants.expoConfig?.extra?.DISCOVERY_API_URL}${relativePath}?apikey=${Constants.expoConfig?.extra?.DISCOVERY_API_KEY}`;
};

const config: IConfig = {
  googleMapKey: "string",
  PUBLIC_ANON: Constants.expoConfig?.extra?.supabaseKey,
  getSupabaseUrl,
  getApiUrlFromRoot,
};

export default config;
