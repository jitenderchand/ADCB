import { useEffect } from "react";
import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider, useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import theme from "./src/style/theme";
import i18n from "./src/utils/i18n";
import NavigationContainer from "./src/routes/Navigation";
import AuthProvider from "./src/store/auth.context";

const queryClient = new QueryClient();

// Component to handle RTL updates
function RTLHandler() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = i18n.language === "ar";
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      // Note: On Android, app restart may be required for full RTL support
      // Text alignment changes should work immediately
    }
  }, [i18n.language]);

  return null;
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <RTLHandler />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NavigationContainer />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
