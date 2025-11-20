import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { View } from "./index";
import { ComponentProps } from "react";
import theme from "@/style/theme";

type ViewProps = ComponentProps<typeof View>;

interface SkeletonLoaderProps extends Omit<ViewProps, "children"> {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  variant?: "rect" | "circle";
  animated?: boolean;
}

export default function SkeletonLoader({
  width = "100%",
  height = 20,
  borderRadius = 4,
  variant = "rect",
  animated = true,
  style,
  ...rest
}: SkeletonLoaderProps) {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (animated) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [fadeAnim, animated]);

  const isCircle = variant === "circle";
  const finalBorderRadius = isCircle ? "50%" : borderRadius;

  return (
    <View {...rest} style={style}>
      <Animated.View
        style={{
          width,
          height: isCircle ? width : height,
          borderRadius: finalBorderRadius,
          backgroundColor: theme.colors.border,
          opacity: animated ? fadeAnim : 0.3,
        }}
      />
    </View>
  );
}

interface SkeletonContainerProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function SkeletonContainer({
  children,
  isLoading = false,
}: SkeletonContainerProps) {
  if (isLoading) {
    return <>{children}</>;
  }
  return <>{children}</>;
}

// Predefined skeleton patterns for common use cases
export function SkeletonText({
  lines = 1,
  width,
  ...props
}: {
  lines?: number;
  width?: number | string;
} & Omit<SkeletonLoaderProps, "width" | "height">) {
  return (
    <View>
      {Array.from({ length: lines }).map((_, index) => (
        <View key={index} marginBottom={index < lines - 1 ? "s" : 0}>
          <SkeletonLoader
            width={index === lines - 1 ? width || "80%" : "100%"}
            height={16}
            {...props}
          />
        </View>
      ))}
    </View>
  );
}

export function SkeletonImage({
  width = "100%",
  height = 250,
  ...props
}: Omit<SkeletonLoaderProps, "variant">) {
  return <SkeletonLoader width={width} height={height} {...props} />;
}

export function SkeletonAvatar({
  size = 40,
  ...props
}: {
  size?: number;
} & Omit<SkeletonLoaderProps, "width" | "height" | "variant">) {
  return <SkeletonLoader width={size} variant="circle" {...props} />;
}

