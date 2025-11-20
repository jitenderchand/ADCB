import { useContext, useRef, useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackNavigation";
import { AuthContext } from "@/store/auth.context";
import { getData, STORAGE_KEYS } from "@/utils/storage";
import { useBiometric } from "@/common/hooks/useBiometric";

export default function InitialScreen() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const { user, isLoading } = useContext(AuthContext);
  const animationFinishedRef = useRef(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState<boolean | null>(
    null
  );
  const { isSupported: isBiometricSupported } = useBiometric();

  useEffect(() => {
    checkBiometricStatus();
  }, []);

  const checkBiometricStatus = async () => {
    const enabled = await getData<boolean>(STORAGE_KEYS.BIOMETRIC_ENABLED);
    setIsBiometricEnabled(enabled === true);
  };

  const navigate = async () => {
    if (user) {
      // Check if biometric is enabled and supported
      if (isBiometricEnabled && isBiometricSupported) {
        navigation.dispatch(
          StackActions.replace(
            "BiometricValidation" as keyof RootStackParamList
          )
        );
      } else {
        navigation.dispatch(
          StackActions.replace("App" as keyof RootStackParamList)
        );
      }
    } else {
      navigation.dispatch(
        StackActions.replace("Auth" as keyof RootStackParamList)
      );
    }
  };

  const handleAnimationFinish = async () => {
    animationFinishedRef.current = true;
    // Navigate if loading is also complete and biometric status is checked
    if (!isLoading && isBiometricEnabled !== null) {
      await navigate();
    }
  };

  // Navigate when loading completes (if animation already finished)
  useEffect(() => {
    if (
      !isLoading &&
      animationFinishedRef.current &&
      isBiometricEnabled !== null
    ) {
      navigate();
    }
  }, [isLoading, user, navigation, isBiometricEnabled, isBiometricSupported]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        autoPlay
        loop={false}
        style={{
          width,
          height,
        }}
        resizeMode="cover"
        source={require("../../assets/splash.json")}
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
}
