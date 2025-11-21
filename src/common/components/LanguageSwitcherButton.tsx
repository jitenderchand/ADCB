import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "@design-system";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/style/theme";
import LanguageModal from "./LanguageModal";

export default function LanguageSwitcherButton() {
  const { i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const currentLanguage = i18n.language || "en";

  return (
    <>
      <View alignItems="center" marginTop="xl">
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons
            name="language"
            size={20}
            color={theme.colors.black}
            style={{ marginRight: 8 }}
          />
          <Text variant="body" color="black">
            {currentLanguage === "en" ? "English" : "العربية"}
          </Text>
        </TouchableOpacity>
      </View>

      <LanguageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
    backgroundColor: "transparent",
  },
});
