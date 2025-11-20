import React from "react";
import { View, Text } from "./index";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/style/theme";

interface NoResultsProps {
  title?: string;
  message?: string;
  icon?: string;
  searchTerm?: string;
}

export default function NoResults({
  title,
  message,
  icon = "search-outline",
  searchTerm,
}: NoResultsProps) {
  const defaultTitle = searchTerm
    ? `No events found for "${searchTerm}"`
    : "No events found";
  const defaultMessage = searchTerm
    ? "Try adjusting your search terms or filters"
    : "There are no events available at the moment";

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      paddingHorizontal="xl"
    >
      <Ionicons
        name={icon}
        size={64}
        color={theme.colors.secondary}
        style={{ marginBottom: 16 }}
      />
      <Text
        variant="header"
        fontSize={20}
        textAlign="center"
        marginBottom="s"
        color="primaryText"
      >
        {title || defaultTitle}
      </Text>
      <Text
        variant="body"
        textAlign="center"
        color="secondaryText"
        fontSize={14}
      >
        {message || defaultMessage}
      </Text>
    </View>
  );
}

