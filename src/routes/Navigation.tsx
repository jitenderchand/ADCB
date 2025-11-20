import { View, StyleSheet } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import RootStackNavigation from "./RootStackNavigation";

const Navigation = createStaticNavigation(RootStackNavigation);

export default function NavigationContainer() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
