import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { useState, useRef } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text, Button, TextInput, ErrorText } from "@design-system";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { PublicRouteParamList } from "@/routes/PublicRoute";
import { AuthService } from "../services";
import { getErrorMessage } from "@/utils/errorUtils";
import { RootStackParamList } from "@/routes/RootStackNavigation";
import { useContext } from "react";
import { AuthContext } from "@/store/auth.context";
import { StackActions } from "@react-navigation/native";
import { useBiometric } from "@/common/hooks/useBiometric";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import theme from "@/style/theme";
import train from "@/assets/train.json";

const signUpSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string().nonempty("Name is required"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignIn() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const { setUser } = useContext(AuthContext);
  const { isSupported: isBiometricSupported } = useBiometric();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ email, password, name }: SignUpSchema) =>
      AuthService.signUp({ email, password, name }),
    onSuccess: async (data) => {
      if (data?.user) {
        await setUser(data.user);
        handleNavigate();
      }
    },
    onError: (error) => {
      console.log("ERROR:", error);
    },
  });

  console.log("isBiometricSupported", isBiometricSupported);

  const handleNavigate = () => {
    if (isBiometricSupported) {
      navigation.navigate("AskBiometric" as never);
    } else {
      navigation.dispatch(
        StackActions.replace("App" as keyof RootStackParamList)
      );
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    await mutate({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <LottieView
        containerStyle={styles.LottieView}
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
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View
              style={styles.container}
              alignItems="center"
              paddingTop="7xl"
              width={300}
            >
              <View flex={1} alignItems="center" alignSelf="stretch">
                <Text variant="header" color="primary">
                  Sign Up Here
                </Text>
                <Text variant="body" marginTop="l">
                  Welcome to the app!
                </Text>
                <View marginTop="2xl" alignSelf="stretch">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <TextInput
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          autoCapitalize="none"
                          label="Name"
                          hasError={!!errors.name}
                        />
                        <ErrorText message={errors.name?.message} />
                      </>
                    )}
                  />
                </View>
                <View alignSelf="stretch">
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
                    Sign Up
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
                      Already have an account?
                    </Text>
                    <Button
                      variant="ghost"
                      onPress={() =>
                        navigation.navigate(
                          "SignIn" as keyof PublicRouteParamList["SignIn"]
                        )
                      }
                    >
                      Login
                    </Button>
                  </View>
                </View>
              </View>
            </View>
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
  LottieView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
