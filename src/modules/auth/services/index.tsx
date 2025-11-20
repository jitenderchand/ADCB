import { createClient } from "@supabase/supabase-js";
import GlobalConfig from "@/utils/globalConfig";

interface SignInParams {
  email: string;
  password: string;
}
interface SignUpParams extends SignInParams {
  name: string;
}

export class AuthService {
  static async signIn({ email, password }: SignInParams) {
    const supabase = createClient(
      GlobalConfig.getSupabaseUrl(),
      GlobalConfig.PUBLIC_ANON as string
    );
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }
  static async signUp({ email, password, name }: SignUpParams) {
    const supabase = createClient(
      GlobalConfig.getSupabaseUrl(),
      GlobalConfig.PUBLIC_ANON as string
    );
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    if (error) throw error;
    return data;
  }
}
