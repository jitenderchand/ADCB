import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  useWindowDimensions,
  Animated,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text, Button, TextInput, ErrorText } from "@design-system";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { RootStackParamList } from "@/routes/RootStackNavigation";
import LottieView from "lottie-react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useEffect, useRef, useContext, useState } from "react";
import { PublicRouteParamList } from "@/routes/PublicRoute";
import { AuthService } from "../services";
import { getErrorMessage } from "@/utils/errorUtils";
import { AuthContext } from "@/store/auth.context";
import { User } from "@supabase/supabase-js";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import theme from "@/style/theme";
import train from "@/assets/train.json";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address"),

  password: z.string().nonempty("Password is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function SignIn() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const { setUser } = useContext(AuthContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ email, password }: LoginSchema) =>
      AuthService.signIn({ email, password }),
    onSuccess: async (data) => {
      if (data?.user) {
        await setUser(data.user as User);
        navigation.dispatch(
          StackActions.replace("App" as keyof RootStackParamList)
        );
      }
    },
    onError: (e) => {
      console.log("ERROR:", e.toString());
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    await mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <LottieView
        containerStyle={styles.lottieView}
        autoPlay
        resizeMode="cover"
        style={{
          width,
          height,
        }}
        source={train}
      />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Animated.View
              style={[
                styles.container,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View
                style={styles.container}
                alignItems="center"
                paddingTop="7xl"
              >
                <View flex={1} alignItems="center">
                  <Text variant="header" color="primary">
                    Login Here
                  </Text>
                  <Text variant="body" marginTop="l">
                    Welcome Back you have been missed!
                  </Text>
                  <View marginTop="2xl" alignSelf="stretch">
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            label="Email"
                            hasError={!!errors.email}
                          />
                          <ErrorText message={errors.email?.message} />
                        </>
                      )}
                    />
                  </View>
                  <View alignSelf="stretch">
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <TextInput
                            label="Password"
                            secureTextEntry={!showPassword}
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                            autoCapitalize="none"
                            hasError={!!errors.password}
                            rightIcon={
                              <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                activeOpacity={0.7}
                              >
                                <Ionicons
                                  name={showPassword ? "eye-off" : "eye"}
                                  size={20}
                                  color={theme.colors.black}
                                />
                              </TouchableOpacity>
                            }
                          />
                          <ErrorText message={errors.password?.message} />
                        </>
                      )}
                    />
                  </View>
                  {isError && error && (
                    <View marginTop="l" alignSelf="stretch">
                      <ErrorText message={getErrorMessage(error)} />
                    </View>
                  )}
                  <View marginTop="xl" alignSelf="stretch">
                    <Button
                      variant="primary"
                      marginTop="xl"
                      onPress={handleSubmit(onSubmit)}
                      disabled={isPending}
                      isLoading={isPending}
                    >
                      Login
                    </Button>
                  </View>
                  <View
                    marginTop="xl"
                    alignSelf="stretch"
                    justifyContent="center"
                  >
                    <View
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text variant="subtle" textAlign="center">
                        Don't have an account?
                      </Text>
                      <Button
                        variant="ghost"
                        onPress={() =>
                          navigation.navigate(
                            "SignUp" as keyof PublicRouteParamList["SignUp"]
                          )
                        }
                      >
                        Sign Up
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottieView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
});
