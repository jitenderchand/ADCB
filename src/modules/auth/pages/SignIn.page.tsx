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
import { useTranslation } from "react-i18next";
import LanguageSwitcherButton from "@/common/components/LanguageSwitcherButton";
import { TFunction } from "i18next";

const createLoginSchema = (t: TFunction<"translation">) =>
  z.object({
    email: z
      .string()
      .nonempty(t("auth.signIn.emailRequired"))
      .email(t("auth.signIn.emailInvalid")),

    password: z.string().nonempty(t("auth.signIn.passwordRequired")),
  });

export default function SignIn() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const { setUser } = useContext(AuthContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = createLoginSchema(t);
  type LoginSchema = z.infer<typeof loginSchema>;

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
                  alignItems: "center",
                },
              ]}
            >
              <View
                style={styles.container}
                alignItems="center"
                paddingTop="7xl"
                width={300}
              >
                <View flex={1} alignItems="center" alignSelf="stretch">
                  <Text variant="header" color="primary">
                    {t("auth.signIn.title")}
                  </Text>
                  <Text variant="body" marginTop="l">
                    {t("auth.signIn.subtitle")}
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
                            label={t("auth.signIn.email")}
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
                            label={t("auth.signIn.password")}
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
                                  name={showPassword ? "eye" : "eye-off"}
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
                      {t("auth.signIn.loginButton")}
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
                        {t("auth.signIn.noAccount")}
                      </Text>
                      <Button
                        variant="ghost"
                        onPress={() =>
                          navigation.navigate(
                            "SignUp" as keyof PublicRouteParamList["SignUp"]
                          )
                        }
                      >
                        {t("auth.signIn.signUpLink")}
                      </Button>
                    </View>
                  </View>
                  <LanguageSwitcherButton />
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
