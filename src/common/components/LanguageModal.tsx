import React from "react";
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

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LanguageModal({
  visible,
  onClose,
}: LanguageModalProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  const handleLanguageChange = async (language: "en" | "ar") => {
    await changeLanguage(language);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
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
  );
}

const styles = StyleSheet.create({
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
