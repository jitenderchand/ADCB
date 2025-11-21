import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, TextInputProps, ViewStyle } from "react-native";
import { View } from "./index";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/style/theme";

interface SearchInputProps extends Omit<TextInputProps, "style"> {
  containerStyle?: ViewStyle;
  onSearch?: (text: string) => void;
  debounceMs?: number;
}

export default function SearchInput({
  containerStyle,
  onSearch,
  debounceMs = 500,
  value,
  onChangeText,
  ...rest
}: SearchInputProps) {
  const [searchText, setSearchText] = useState(value || "");
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();
  const handleTextChange = (text: string) => {
    setSearchText(text);

    // Update controlled value if provided
    onChangeText?.(text);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for debounced search
    if (onSearch) {
      debounceTimerRef.current = setTimeout(() => {
        onSearch(text);
      }, debounceMs);
    }
  };

  useEffect(() => {
    // Sync with external value changes
    if (value !== undefined && value !== searchText) {
      setSearchText(value);
    }
  }, [value]);

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <View
      flexDirection="row"
      alignItems="center"
      backgroundColor="white"
      borderRadius="s"
      paddingHorizontal="m"
      style={[styles.container, containerStyle]}
    >
      <Ionicons
        name="search"
        size={20}
        color={theme.colors.secondary}
        style={{ marginRight: 8 }}
      />
      <TextInput
        style={styles.input}
        placeholder={t("home.searchForEvents")}
        placeholderTextColor={theme.colors.secondary}
        value={searchText}
        onChangeText={handleTextChange}
        {...rest}
      />
      {searchText.length > 0 && (
        <Ionicons
          name="close-circle"
          size={20}
          color={theme.colors.secondary}
          onPress={() => handleTextChange("")}
          style={{ marginLeft: 8 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    padding: 0,
  },
});
