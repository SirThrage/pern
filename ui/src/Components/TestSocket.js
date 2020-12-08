import { useSocket } from "Hooks"
import { SocketContext } from "Providers";
import { useContext, useState } from "react";

export const TestSocket = () => {
  const [ socket, connected ] = useContext( SocketContext );
  const [ message, setMessage ] = useState( '' );

  useSocket( 'test', message => setMessage( message ));

  return (
    <div>
      <button disabled={ !connected } onClick={ () => socket.emit( 'test' ) }>Test Socket</button>&nbsp;
      Socket Message: { message }
    </div>
  )
}
