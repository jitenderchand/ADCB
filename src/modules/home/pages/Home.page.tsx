import { StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { View, Text } from "@design-system";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/style/theme";
import { EventService } from "../services/event.service";
import EventMapView from "../components/EventMapView";
import EventGridView from "../components/EventGridView";
import { Event } from "@/common/types/event";
import { HomeStackParamList } from "@/routes/HomeStackNavigator";
import { useTranslation } from "react-i18next";
import { SearchInput, NoResults } from "@/common/components";
import { VIEW_TYPES, ViewType } from "../constants/viewTypes";

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export default function HomePage() {
  const navigation = useNavigation<NavigationProp>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [viewType, setViewType] = useState<ViewType>(VIEW_TYPES.GRID);
  const { t } = useTranslation();
  const handleMarkerPress = (event: Event) => {
    navigation.navigate("EventDetail", { event });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", "Dubai", "AE", searchKeyword],
    queryFn: () =>
      EventService.getEvents({
        city: "Dubai",
        countryCode: "AE",
        size: 50,
        keyword: searchKeyword || undefined,
      }),
  });

  const events = data?._embedded?.events || [];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View flex={1}>
          <View height={100} paddingHorizontal="l" paddingTop="m">
            <View
              justifyContent="center"
              alignItems="center"
              alignSelf="stretch"
              marginTop="l"
            >
              <Text
                variant="header"
                fontSize={18}
                fontWeight="bold"
                color="white"
              >
                {t("home.searchForEvents")}
              </Text>
            </View>
            <View
              position="absolute"
              left={0}
              right={0}
              bottom={-20}
              alignItems="center"
              zIndex={1}
            >
              <View width="90%">
                <SearchInput
                  onSearch={setSearchKeyword}
                  debounceMs={500}
                  containerStyle={styles.searchInput}
                />
              </View>
            </View>
            {/* View Toggle Button */}
            <View position="absolute" top={16} right={16} zIndex={2}>
              <TouchableOpacity
                onPress={() =>
                  setViewType(
                    viewType === VIEW_TYPES.MAP
                      ? VIEW_TYPES.GRID
                      : VIEW_TYPES.MAP
                  )
                }
                style={styles.toggleButton}
              >
                <Ionicons
                  name={viewType === VIEW_TYPES.MAP ? "grid" : "map"}
                  size={24}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View backgroundColor={"gray50"} flex={1}>
            {error ? (
              <View flex={1} justifyContent="center" alignItems="center">
                <Text color="error">Error loading events</Text>
                <Text marginTop="s">
                  {error instanceof Error ? error.message : "Unknown error"}
                </Text>
              </View>
            ) : !isLoading && events.length === 0 ? (
              <NoResults searchTerm={searchKeyword || undefined} />
            ) : viewType === VIEW_TYPES.MAP ? (
              <EventMapView
                events={events}
                isLoading={isLoading}
                onMarkerPress={handleMarkerPress}
              />
            ) : (
              <EventGridView
                events={events}
                isLoading={isLoading}
                onEventPress={handleMarkerPress}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary500,
  },
  searchInput: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toggleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary500,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
