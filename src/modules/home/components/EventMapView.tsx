import React from "react";
import { StyleSheet, Platform } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import LottieView from "lottie-react-native";
import { View, Text } from "@design-system";
import { Event } from "@/common/types/event";

interface EventMapViewProps {
  events: Event[];
  isLoading?: boolean;
  initialRegion?: Region;
  zoomEnabled?: boolean;
  scrollEnabled?: boolean;
  rotateEnabled?: boolean;
  pitchEnabled?: boolean;
  onMarkerPress?: (event: Event) => void;
  showAllMarkers?: boolean; // If false, show only single event marker
}

// Default region for UAE Dubai - zoomed out to show more area
const DEFAULT_REGION: Region = {
  latitude: 25.2048,
  longitude: 55.2708,
  latitudeDelta: 0.5, // Increased from 0.1 to zoom out more
  longitudeDelta: 0.5, // Increased from 0.1 to zoom out more
};

export default function EventMapView({
  events,
  isLoading = false,
  initialRegion = DEFAULT_REGION,
  zoomEnabled = true,
  scrollEnabled = true,
  rotateEnabled = true,
  pitchEnabled = true,
  onMarkerPress,
  showAllMarkers = true,
}: EventMapViewProps) {
  if (isLoading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <LottieView
          autoPlay
          loop
          style={styles.lottie}
          source={require("../../../../assets/map.json")}
        />
        <View>
          <Text>Loading events...</Text>
        </View>
      </View>
    );
  }

  const markers = events
    .filter((event) => {
      const venue = event._embedded?.venues?.[0];
      return venue?.location?.latitude && venue?.location?.longitude;
    })
    .map((event) => {
      const venue = event._embedded?.venues?.[0];
      return {
        id: event.id,
        title: event.name,
        description: venue?.name || "",
        latitude: parseFloat(venue!.location!.latitude),
        longitude: parseFloat(venue!.location!.longitude),
        event,
      };
    });

  // Calculate region to fit all markers if events exist, otherwise use default
  let mapRegion = initialRegion;
  if (markers.length > 0) {
    if (showAllMarkers) {
      const latitudes = markers.map((m) => m.latitude);
      const longitudes = markers.map((m) => m.longitude);
      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      const latDelta = (maxLat - minLat) * 1.5; // Add padding
      const lngDelta = (maxLng - minLng) * 1.5; // Add padding

      mapRegion = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: Math.max(latDelta, 0.1), // Minimum zoom level
        longitudeDelta: Math.max(lngDelta, 0.1), // Minimum zoom level
      };
    } else {
      // For single event, center on that marker
      const marker = markers[0];
      mapRegion = {
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
  }

  return (
    <MapView
      key={
        showAllMarkers
          ? "all-markers"
          : `single-event-${markers[0]?.id || "default"}`
      }
      style={styles.map}
      initialRegion={mapRegion}
      zoomEnabled={zoomEnabled}
      zoomTapEnabled={zoomEnabled}
      scrollEnabled={scrollEnabled}
      rotateEnabled={rotateEnabled}
      pitchEnabled={pitchEnabled}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          description={marker.description}
          onPress={() => onMarkerPress?.(marker.event)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
