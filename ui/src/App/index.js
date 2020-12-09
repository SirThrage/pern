import { ApiStatus, SocketStatus, TestSocket } from "Components";
import { SocketProvider, UserProvider } from "Providers";

export const App = () => (
  <UserProvider>
    <ApiStatus />
    <SocketProvider>
      <SocketStatus />
      <TestSocket />
    </SocketProvider>
  </UserProvider>
)
