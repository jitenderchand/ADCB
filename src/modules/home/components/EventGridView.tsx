import React from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ListRenderItem,
} from "react-native";
import { View, Text } from "@design-system";
import { Event } from "@/common/types/event";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/style/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@/routes/HomeStackNavigator";
import { useTranslation } from "react-i18next";

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

interface EventGridViewProps {
  events: Event[];
  isLoading?: boolean;
  onEventPress?: (event: Event) => void;
}

export default function EventGridView({
  events,
  isLoading = false,
  onEventPress,
}: EventGridViewProps) {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const handleEventPress = (event: Event) => {
    if (onEventPress) {
      onEventPress(event);
    } else {
      navigation.navigate("EventDetail", { event });
    }
  };

  const renderEventCard: ListRenderItem<Event> = ({ item: event }) => {
    const eventImage = event.images?.[0]?.url;
    const startDate = event.dates?.start?.localDate;
    const venue = event._embedded?.venues?.[0];

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleEventPress(event)}
        activeOpacity={0.7}
      >
        {eventImage ? (
          <Image
            source={{ uri: eventImage }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons
              name="musical-notes"
              size={32}
              color={theme.colors.secondary}
            />
          </View>
        )}
        <View padding="s" style={styles.cardContent}>
          <Text
            variant="body"
            fontSize={14}
            fontWeight="600"
            numberOfLines={2}
            marginBottom="s"
          >
            {event.name}
          </Text>
          {venue && (
            <View flexDirection="row" alignItems="center" marginBottom="s">
              <Ionicons
                name="location"
                size={12}
                color={theme.colors.secondary}
                style={{ marginRight: 4 }}
              />
              <Text variant="subtle" fontSize={12}>
                {venue.name}
              </Text>
            </View>
          )}
          {startDate && (
            <View flexDirection="row" alignItems="center">
              <Ionicons
                name="calendar"
                size={12}
                color={theme.colors.secondary}
                style={{ marginRight: 4 }}
              />
              <Text variant="subtle" fontSize={12}>
                {startDate}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>{t("home.loadingEvents")}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      renderItem={renderEventCard}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "white",
    borderRadius: 2,
    overflow: "hidden",
    elevation: 1,
    shadowColor: theme.colors.gray500,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: "100%",
    height: 120,
  },
  placeholderImage: {
    width: "100%",
    height: 120,
    backgroundColor: theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    minHeight: 80,
    padding: theme.spacing.l,
  },
});
