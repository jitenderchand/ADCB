import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "@/modules/auth/pages/SignIn.page";
import SignUp from "@/modules/auth/pages/SignUp.page";
import AskBiometric from "@/modules/auth/pages/AskBiometric.page";

export interface PublicRouteParamList {
  SignIn: undefined;
  SignUp: undefined;
  AskBiometric: undefined;
  [key: string]: object | undefined;
}

export default createNativeStackNavigator<PublicRouteParamList>({
  initialRouteName: "SignIn",
  screenOptions: {
    headerShown: false,
  },
  screens: {
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
    AskBiometric: {
      screen: AskBiometric,
    },
  },
});
