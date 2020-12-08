import { SocketContext } from 'Providers';
import { useContext, useEffect } from 'react';

/**
 * Subscribes to a socket event. Automatically unsubscribes from the event if the
 * component that calls this hook is no longer rendering.
 * @param {string} messageType A message type, such as 'message' or MESSAGES.DEFAULT.
 * @method A function to perform when the message is received.
 */
export const useSocket = ( messageType, method ) => {
  const [ socket ] = useContext( SocketContext );

  useEffect(() => {
    socket.on( messageType, method );
    return () => socket.off( messageType, method );
  }, [ socket, messageType, method ] );
}
