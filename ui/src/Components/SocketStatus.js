import { SocketContext } from "Providers"
import { useContext } from "react"

export const SocketStatus = () => {
  const [ , connected ] = useContext( SocketContext );

  return (
    <div>
    Socket is {
      connected ?
        <span style={{ fontWeight: 'bold', color: 'green' }}>Connected</span>
      :
        <span style={{ fontWeight: 'bold', color: 'red' }}>Disconnected</span>
    }.
  </div>
  )
}
