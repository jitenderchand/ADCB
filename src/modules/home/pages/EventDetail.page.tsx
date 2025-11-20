import {
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
} from "react-native";
import { View, Text } from "@design-system";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import theme from "@/style/theme";
import { Event } from "@/common/types/event";
import EventMapView from "../components/EventMapView";
import { Ionicons } from "@expo/vector-icons";

interface RouteParams {
  event: Event;
}

export default function EventDetailPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { event } = (route.params as RouteParams) || {};

  if (!event) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View flex={1} justifyContent="center" alignItems="center">
            <Text>Event not found</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const venue = event._embedded?.venues?.[0];
  const eventImage = event.images?.[0]?.url;
  const startDate = event.dates?.start?.localDate;
  const startTime = event.dates?.start?.localTime;
  const segment = event.classifications?.[0]?.segment?.name;
  const genre = event.classifications?.[0]?.genre?.name;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View flex={1} backgroundColor="white">
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={{ uri: eventImage }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <View flexDirection="row" alignItems="center" padding="l">
                  <View
                    backgroundColor="black"
                    borderRadius="l"
                    padding="s"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Ionicons
                      name="arrow-back"
                      size={24}
                      color="white"
                      onPress={() => navigation.goBack()}
                      style={{ marginRight: 12 }}
                    />
                  </View>
                </View>
                {/* Black Tile Overlay with Event Name */}
                <View style={styles.overlay}>
                  <View style={styles.blackTile}>
                    <Text variant="header" color="white" fontSize={24}>
                      {event.name}
                    </Text>
                  </View>
                </View>
              </SafeAreaView>
            </SafeAreaProvider>
          </ImageBackground>

          {/* Event Info */}
          <View padding="l">
            {segment && (
              <View flexDirection="row" alignItems="center" marginBottom="s">
                <Ionicons
                  name="musical-notes"
                  size={16}
                  color={theme.colors.primary500}
                  style={{ marginRight: 8 }}
                />
                <Text variant="body">{segment}</Text>
                {genre && <Text variant="body"> • {genre}</Text>}
              </View>
            )}

            {startDate && (
              <View flexDirection="row" alignItems="center" marginBottom="s">
                <Ionicons
                  name="calendar"
                  size={16}
                  color={theme.colors.primary500}
                  style={{ marginRight: 8 }}
                />
                <Text variant="body">
                  {startDate}
                  {startTime && ` at ${startTime}`}
                </Text>
              </View>
            )}

            {venue && (
              <View marginTop="m">
                <Text variant="header" fontSize={18} marginBottom="s">
                  Venue
                </Text>
                <Text variant="body" marginBottom="s">
                  {venue.name}
                </Text>
                {venue.address && (
                  <View>
                    {venue.address.line1 && (
                      <Text variant="body" marginBottom="s">
                        {venue.address.line1}
                      </Text>
                    )}
                    {venue.address.city && (
                      <Text variant="body" marginBottom="s">
                        {venue.address.city}
                        {venue.address.state && `, ${venue.address.state}`}
                      </Text>
                    )}
                    {venue.address.postalCode && (
                      <Text variant="body" marginBottom="s">
                        {venue.address.postalCode}
                      </Text>
                    )}
                    {venue.address.country && (
                      <Text variant="body">{venue.address.country}</Text>
                    )}
                  </View>
                )}
              </View>
            )}

            {/* Map Section */}
            {venue?.location?.latitude && venue?.location?.longitude && (
              <View marginTop="xl" marginBottom="l">
                <Text variant="header" fontSize={18} marginBottom="m">
                  Location
                </Text>
                <View height={200} borderRadius="m" overflow="hidden">
                  <EventMapView
                    events={[event]}
                    showAllMarkers={false}
                    zoomEnabled={false}
                    scrollEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary500,
  },
  backgroundImage: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
    backgroundColor: "black",
    opacity: 0.8,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blackTile: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
});
