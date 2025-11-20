import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "@/style/theme";
import HomeStackNavigator from "./HomeStackNavigator";
import ProfilePage from "@/modules/profile/pages/Profile.page";
import { Ionicons } from "@expo/vector-icons";

export default createBottomTabNavigator({
  initialRouteName: "HomePage",
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.secondary,
    tabBarStyle: {
      paddingBottom: 8,
      paddingTop: 8,
      height: 60,
    },
  },
  screens: {
    HomePage: {
      screen: HomeStackNavigator,
      options: {
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      },
    },
    ProfilePage: {
      screen: ProfilePage,
      options: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        ),
      },
    },
  },
});
