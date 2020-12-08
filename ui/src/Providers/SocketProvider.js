import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { baseURL, GetCookie } from 'API';

export const SocketContext = createContext();

export let Socket;

const { NODE_ENV } = process.env;

export const SocketProvider = ({ children }) => {
  const { Provider } = SocketContext;

  const [ socket, setSocket ] = useState();
  const [ connected, setConnected ] = useState();

  useEffect(() => {
    Socket = socket;
    if ( NODE_ENV === 'development' ) window.socket = socket;
  }, [ socket ]);

  useEffect(() => {
    const _socket = io( baseURL, {
      query: GetCookie(),
      path: `/socket.io`,
    })
    .on( 'connect', () => {
      setConnected( true );
    })
    .on( 'disconnect', () => setConnected());
    
    setSocket( _socket );

    return () => {
      _socket.off();
      _socket.disconnect();
    }
  }, [] );

  return (
    <Provider value={[ socket, connected ]}>
      { socket && children }
    </Provider>
  )
}
