import {
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { Pressable, ActivityIndicator } from "react-native";
import { Theme } from "../../style/theme";
import LottieView from "lottie-react-native";
import dotLoader from "@/assets/dot_loader.json";

export const View = createBox<Theme>();
export const Text = createText<Theme>();

const buttonVariant = createVariant<Theme>({
  themeKey: "buttonVariants",
});

const RestyleButton = createRestyleComponent<any, Theme>(
  [buttonVariant],
  Pressable
);

export const Button = ({
  variant = "primary",
  children,
  isLoading = false,
  ...rest
}: any) => {
  return (
    <RestyleButton
      variant={variant}
      {...rest}
      style={({ pressed }: { pressed: boolean }) => [
        {
          opacity: pressed ? 0.6 : 1,
          minHeight: 50,
        },
        rest.style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text variant={variant === "ghost" ? "ghost" : "button"}>
          {children}
        </Text>
      )}
    </RestyleButton>
  );
};

export { default as TextInput } from "./TextInput";
export { default as ErrorText } from "./Error";
export { default as SearchInput } from "./SearchInput";
export { default as NoResults } from "./NoResults";
export {
  default as SkeletonLoader,
  SkeletonContainer,
  SkeletonText,
  SkeletonImage,
  SkeletonAvatar,
} from "./SkeletonLoader";
export { default as LanguageModal } from "./LanguageModal";
export { default as LanguageSwitcherButton } from "./LanguageSwitcherButton";
