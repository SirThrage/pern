import { API } from "API";
import { useEffect, useState } from "react"

export const ApiStatus = () => {
  const [ available, setAvailable ] = useState();

  useEffect(() => {
    const check = () => API.get( '/status' )
      .then(() => setAvailable( true ))
      .catch(() => setAvailable( false ));
    const interval = setInterval( check, 1000 );
    check();
    return () => clearInterval( interval );
  }, [] );

  return (
    <div>
      API is {
        available ?
          <span style={{ fontWeight: 'bold', color: 'green' }}>Available</span>
        :
          <span style={{ fontWeight: 'bold', color: 'red' }}>Unavailable</span>
      }.&nbsp;
    </div>
  )
}
