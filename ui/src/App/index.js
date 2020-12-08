import { ApiStatus, SocketStatus, TestSocket } from "Components";
import { SocketProvider } from "Providers";

import './App.scss';

export const App = () => (
  <div id="App">
    <ApiStatus />
    <SocketProvider>
      <SocketStatus />
      <TestSocket />
    </SocketProvider>
  </div>
)
