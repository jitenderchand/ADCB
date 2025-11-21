import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { View, Text } from "@design-system";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/store/auth.context";
import { RootStackParamList } from "@/routes/RootStackNavigation";
import theme from "@/style/theme";
import { useBiometric } from "@/common/hooks/useBiometric";
import { getData, STORAGE_KEYS } from "@/utils/storage";
import { useTranslation } from "react-i18next";
import LanguageModal from "@/common/components/LanguageModal";

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);
  const { isSupported: isBiometricSupported, biometricType } = useBiometric();
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const currentLanguage = i18n.language || "en";

  useEffect(() => {
    checkBiometricStatus();
  }, []);

  const checkBiometricStatus = async () => {
    const enabled = await getData<boolean>(STORAGE_KEYS.BIOMETRIC_ENABLED);
    setIsBiometricEnabled(enabled === true);
  };

  const handleEnableBiometric = () => {
    // @ts-ignore
    navigation.navigate("Auth", {
      screen: "AskBiometric",
    });
  };

  const handleLogout = () => {
    Alert.alert(
      t("profile.logout"),
      t("profile.logoutConfirm"),
      [
        {
          text: t("profile.cancel"),
          style: "cancel",
        },
        {
          text: t("profile.logout"),
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              navigation.dispatch(
                StackActions.replace("Auth" as keyof RootStackParamList)
              );
            } catch (error) {
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const userName =
    user?.user_metadata?.name || user?.email?.split("@")[0] || "User";

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          backgroundColor="primary"
          height={50}
          flexDirection="row"
          paddingHorizontal="l"
          alignItems="center"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
            style={{ marginRight: 12 }}
          />
          <Text
            variant="header"
            fontSize={20}
            color="white"
            flex={1}
            textAlign="center"
          >
            {t("profile.title")}
          </Text>
        </View>
        <View flex={1} backgroundColor="white">
          <View padding="xl">
            <View alignItems="center">
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={50} color="black" />
              </View>
            </View>
            {userName && (
              <Text
                variant="header"
                fontSize={20}
                marginTop="m"
                textAlign="center"
              >
                {userName}
              </Text>
            )}
            {user?.email && (
              <Text
                variant="body"
                color="secondaryText"
                marginTop="s"
                textAlign="center"
              >
                {user.email}
              </Text>
            )}
          </View>

          {/* Settings List */}
          <View paddingHorizontal="l" marginTop="xl">
            {/* Language Switcher */}
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => setLanguageModalVisible(true)}
              activeOpacity={0.7}
            >
              <View flexDirection="row" alignItems="center" flex={1}>
                <Ionicons
                  name="language"
                  size={24}
                  color={theme.colors.primary500}
                  style={{ marginRight: 12 }}
                />
                <Text variant="body" color="primaryText" flex={1}>
                  {t("common.language")}
                </Text>
                <Text variant="body" color="secondaryText" marginRight="s">
                  {currentLanguage === "en" ? "English" : "العربية"}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={theme.colors.secondary}
                />
              </View>
            </TouchableOpacity>

            {/* Biometric Enable List Item */}
            {isBiometricSupported && !isBiometricEnabled && (
              <TouchableOpacity
                style={styles.listItem}
                onPress={handleEnableBiometric}
                activeOpacity={0.7}
              >
                <View flexDirection="row" alignItems="center" flex={1}>
                  <Ionicons
                    name={biometricType === "Face ID" ? "scan" : "finger-print"}
                    size={24}
                    color={theme.colors.primary500}
                    style={{ marginRight: 12 }}
                  />
                  <Text variant="body" color="primaryText" flex={1}>
                    {t("profile.enableBiometric", { type: biometricType })}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={theme.colors.secondary}
                />
              </TouchableOpacity>
            )}

            {/* Logout List Item */}
            <TouchableOpacity
              style={styles.listItem}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <View flexDirection="row" alignItems="center" flex={1}>
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  color={theme.colors.error}
                  style={{ marginRight: 12 }}
                />
                <Text variant="body" color="error" flex={1}>
                  {t("profile.logout")}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <LanguageModal
          visible={languageModalVisible}
          onClose={() => setLanguageModalVisible(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.white,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
});
