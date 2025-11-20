import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PublicRoute from "./PublicRoute";
import PrivateRoutes from "./PrivateRoutes";
import InitialScreen from "./InitialScreen";
import BiometricValidation from "@/modules/auth/pages/BiometricValidation.page";

export type RootStackParamList = {
  InitialScreen: undefined;
  Auth: undefined;
  App: undefined;
  BiometricValidation: undefined;
};

export default createNativeStackNavigator<RootStackParamList>({
  initialRouteName: "InitialScreen",
  screenOptions: {
    headerShown: false,
  },
  screens: {
    InitialScreen: {
      screen: InitialScreen,
    },
    Auth: {
      screen: PublicRoute,
    },
    App: {
      screen: PrivateRoutes,
    },
    BiometricValidation: {
      screen: BiometricValidation,
    },
  },
});
