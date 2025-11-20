import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./src/style/theme";

const queryClient = new QueryClient();

import NavigationContainer from "./src/routes/Navigation";
import AuthProvider from "./src/store/auth.context";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationContainer />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
