import { Text } from "@design-system";

const ErrorText = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <Text color="error" fontStyle="italic" fontWeight="500">
      {message}
    </Text>
  );
};

export default ErrorText;
