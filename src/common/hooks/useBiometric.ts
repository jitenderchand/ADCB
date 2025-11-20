import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export interface BiometricSupport {
  isSupported: boolean;
  biometricType: string;
  isLoading: boolean;
}

export function useBiometric(): BiometricSupport {
  const [isSupported, setIsSupported] = useState(false);
  const [biometricType, setBiometricType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      setIsLoading(true);
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      const supported = compatible && enrolled;
      setIsSupported(supported);

      if (
        types.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        setBiometricType("Face ID");
      } else if (
        types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
      ) {
        setBiometricType("Fingerprint");
      } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
        setBiometricType("Iris");
      } else {
        setBiometricType("Biometric");
      }
    } catch (error) {
      console.error("Error checking biometric support:", error);
      setIsSupported(false);
      setBiometricType("Biometric");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSupported,
    biometricType,
    isLoading,
  };
}
