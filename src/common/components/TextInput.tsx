import React, { useState, useRef, ReactNode } from "react";
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import theme, { Theme } from "@/style/theme";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  activeBorderColor?: string;
  inactiveBorderColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  hasError?: boolean;
  rightIcon?: ReactNode;
}

export default function FloatingLabelInput({
  label,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  activeBorderColor = theme.colors.blue300,
  inactiveBorderColor = theme.colors.border,
  activeBackgroundColor = theme.colors.blue50,
  inactiveBackgroundColor = theme.colors.cardBackground,
  hasError = false,
  rightIcon,
  ...rest
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animated, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animated, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: "absolute" as const,
    left: 12,
    backgroundColor: animated.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", theme.colors.cardBackground],
    }),
    paddingHorizontal: 4,
    zIndex: 1,

    top: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 10],
    }),

    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),

    color: animated.interpolate({
      inputRange: [0, 1],
      outputRange: ["#777", "#000"],
    }),
  };

  return (
    <View style={[{ paddingTop: 18 }, containerStyle]}>
      <Animated.Text
        style={[labelStyle, { fontWeight: "700", pointerEvents: "none" }]}
      >
        {label}
      </Animated.Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          style={[
            styles.input,
            inputStyle,
            rightIcon && styles.inputWithIcon,
            {
              borderColor: hasError
                ? theme.colors.error
                : isFocused
                ? activeBorderColor
                : inactiveBorderColor,
              backgroundColor: hasError
                ? theme.colors.red50
                : isFocused
                ? activeBackgroundColor
                : inactiveBackgroundColor,
            },
          ]}
          {...rest}
          onBlur={(e) => {
            handleBlur();
            rest.onBlur?.(e);
          }}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  rightIconContainer: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
