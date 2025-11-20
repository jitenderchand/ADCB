/**
 * Helper function to extract error message from various error formats
 * Handles Supabase AuthApiError, standard Error objects, and other error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object") {
    // Check if it's a Supabase AuthApiError or similar
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
    // Check if error has a toString method that gives useful info
    if (error instanceof Error) {
      return error.message || error.toString();
    }
  }
  return "An error occurred. Please try again.";
};
