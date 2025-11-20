import { useState, useEffect } from "react";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text } from "@design-system";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { RootStackParamList } from "@/routes/RootStackNavigation";
import theme from "@/style/theme";
import { useBiometric } from "@/common/hooks/useBiometric";

export default function BiometricValidation() {
  const navigation = useNavigation();
  const { biometricType } = useBiometric();
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    handleBiometricValidation();
  }, []);

  const handleBiometricValidation = async () => {
    setIsValidating(true);
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Authenticate with ${biometricType} to continue`,
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success) {
        navigateToApp();
      } else {
        // User cancelled or failed - show alert and retry
        Alert.alert(
          "Authentication Required",
          `Please authenticate with ${biometricType} to access the app.`,
          [
            {
              text: "Try Again",
              onPress: handleBiometricValidation,
            },
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {
                // Navigate back to Auth if user cancels
                navigation.dispatch(
                  StackActions.replace("Auth" as keyof RootStackParamList)
                );
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Biometric validation error:", error);
      Alert.alert(
        "Error",
        "An error occurred during biometric authentication. Please try again.",
        [
          {
            text: "Try Again",
            onPress: handleBiometricValidation,
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              navigation.dispatch(
                StackActions.replace("Auth" as keyof RootStackParamList)
              );
            },
          },
        ]
      );
    } finally {
      setIsValidating(false);
    }
  };

  const navigateToApp = () => {
    navigation.dispatch(
      StackActions.replace("App" as keyof RootStackParamList)
    );
  };

  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  button: {
    backgroundColor: theme.colors.primary500,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
});
