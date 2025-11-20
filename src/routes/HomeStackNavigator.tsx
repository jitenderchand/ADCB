import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "@/modules/home/pages/Home.page";
import EventDetailPage from "@/modules/home/pages/EventDetail.page";
import { Event } from "@/common/types/event";

export type HomeStackParamList = {
  HomePage: undefined;
  EventDetail: { event: Event };
};

export default createNativeStackNavigator<HomeStackParamList>({
  initialRouteName: "HomePage",
  screenOptions: {
    headerShown: false,
  },
  screens: {
    HomePage: {
      screen: HomePage,
    },
    EventDetail: {
      screen: EventDetailPage,
    },
  },
});
