import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { GetCookie } from 'API';

const {
  REACT_APP_API = 'http://localhost:8080',
} = process.env;

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { Provider } = SocketContext;

  const [ socket, setSocket ] = useState();
  const [ connected, setConnected ] = useState();

  useEffect(() => {
    const _socket = io( REACT_APP_API, {
      query: GetCookie(),
      resource: `/socket.io`,
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
