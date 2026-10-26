import { Stack } from "expo-router";
import { TransferProvider } from "../store/TransferContext";

export default function RootLayout() {
  return (
    <TransferProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TransferProvider>
  );
}