import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View as RNView,
} from "react-native";
import { View, Text } from "@design-system";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/style/theme";
import { changeLanguage } from "@/utils/i18n";

interface LanguageSwitcherProps {
  variant?: "button" | "listItem";
}

export default function LanguageSwitcher({
  variant = "button",
}: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const currentLanguage = i18n.language || "en";

  const handleLanguageChange = async (language: "en" | "ar") => {
    await changeLanguage(language);
    setModalVisible(false);
  };

  if (variant === "listItem") {
    return (
      <>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => setModalVisible(true)}
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
              {currentLanguage === "en"
                ? t("common.english")
                : t("common.arabic")}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.secondary}
            />
          </View>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <RNView style={styles.modalContent}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                <View padding="l">
                  <Text variant="header" marginBottom="l">
                    {t("common.selectLanguage")}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.languageOption,
                      currentLanguage === "en" && styles.selectedOption,
                    ]}
                    onPress={() => handleLanguageChange("en")}
                    activeOpacity={0.7}
                  >
                    <Text
                      variant="body"
                      color={
                        currentLanguage === "en" ? "primary" : "primaryText"
                      }
                    >
                      English
                    </Text>
                    {currentLanguage === "en" && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={theme.colors.primary}
                      />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.languageOption,
                      currentLanguage === "ar" && styles.selectedOption,
                    ]}
                    onPress={() => handleLanguageChange("ar")}
                    activeOpacity={0.7}
                  >
                    <Text
                      variant="body"
                      color={
                        currentLanguage === "ar" ? "primary" : "primaryText"
                      }
                    >
                      العربية
                    </Text>
                    {currentLanguage === "ar" && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={theme.colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </RNView>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }

  // Button variant (for SignIn/SignUp pages)
  return (
    <>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Ionicons
          name="language"
          size={20}
          color={theme.colors.primary}
          style={{ marginRight: 8 }}
        />
        <Text variant="body" color="primary">
          {currentLanguage === "en" ? "English" : "العربية"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <RNView style={styles.modalContent}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View padding="l">
                <Text variant="header" marginBottom="l">
                  {t("common.selectLanguage")}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    currentLanguage === "en" && styles.selectedOption,
                  ]}
                  onPress={() => handleLanguageChange("en")}
                  activeOpacity={0.7}
                >
                  <Text
                    variant="body"
                    color={currentLanguage === "en" ? "primary" : "primaryText"}
                  >
                    English
                  </Text>
                  {currentLanguage === "en" && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={theme.colors.primary}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    currentLanguage === "ar" && styles.selectedOption,
                  ]}
                  onPress={() => handleLanguageChange("ar")}
                  activeOpacity={0.7}
                >
                  <Text
                    variant="body"
                    color={currentLanguage === "ar" ? "primary" : "primaryText"}
                  >
                    العربية
                  </Text>
                  {currentLanguage === "ar" && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={theme.colors.primary}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </RNView>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.white,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    width: "80%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: theme.colors.gray50,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary50,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
});
