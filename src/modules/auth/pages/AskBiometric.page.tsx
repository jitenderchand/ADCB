import { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text, Button } from "@design-system";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { RootStackParamList } from "@/routes/RootStackNavigation";
import theme from "@/style/theme";
import { storeData, STORAGE_KEYS } from "@/utils/storage";
import { useBiometric } from "@/common/hooks/useBiometric";

export default function AskBiometric() {
  const navigation = useNavigation();
  const { isSupported, biometricType } = useBiometric();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnableBiometric = async () => {
    setIsLoading(true);
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Enable ${biometricType} authentication`,
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success) {
        // Store biometric preference
        await storeData(STORAGE_KEYS.BIOMETRIC_ENABLED, true);
        navigateToApp();
      } else {
        Alert.alert(
          "Authentication Failed",
          "Biometric authentication was not successful. Please try again."
        );
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      Alert.alert(
        "Error",
        "An error occurred during biometric setup. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Otherwise, replace with App (coming from signup flow)
      navigation.dispatch(
        StackActions.replace("App" as keyof RootStackParamList)
      );
    }
  };

  const navigateToApp = () => {
    navigation.dispatch(
      StackActions.replace("App" as keyof RootStackParamList)
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          flex={1}
          justifyContent="center"
          alignItems="center"
          paddingHorizontal="xl"
        >
          {/* Biometric Icon */}
          <View
            width={120}
            height={120}
            style={{ borderRadius: 60 }}
            backgroundColor="primary500"
            justifyContent="center"
            alignItems="center"
            marginBottom="xl"
          >
            <Ionicons
              name={
                biometricType === "Face ID"
                  ? "scan"
                  : biometricType === "Fingerprint"
                  ? "finger-print"
                  : "lock-closed"
              }
              size={64}
              color="white"
            />
          </View>

          {/* Title */}
          <Text
            variant="header"
            fontSize={24}
            fontWeight="bold"
            textAlign="center"
            marginBottom="m"
            color="primaryText"
          >
            Enable {biometricType || "Biometric"} Authentication
          </Text>

          {/* Description */}
          <Text
            variant="body"
            textAlign="center"
            color="secondaryText"
            marginBottom="xl"
            paddingHorizontal="l"
          >
            {isSupported
              ? `Use ${biometricType} to quickly and securely access your account. You can enable this feature now or skip it for later.`
              : `${biometricType} authentication is not available on this device. You can skip this step.`}
          </Text>

          {/* Buttons */}
          <View width="90%">
            {isSupported && (
              <Button
                variant="primary"
                onPress={handleEnableBiometric}
                disabled={isLoading}
                isLoading={isLoading}
                marginBottom="m"
                alignSelf="stretch"
              >
                <View paddingRight="s">
                  <Ionicons
                    name={biometricType === "Face ID" ? "scan" : "finger-print"}
                    size={20}
                    color="white"
                  />
                </View>
                <View>
                  <Text color="white" fontWeight="600">
                    Enable {biometricType}
                  </Text>
                </View>
              </Button>
            )}
            <View marginTop="l">
              <Button variant="ghost" onPress={handleSkip}>
                <Text color="primary500" fontWeight="600">
                  Skip for now
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
