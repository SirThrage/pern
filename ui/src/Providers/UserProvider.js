import React, { createContext, useEffect, useState } from 'react';
import { Resume, Refresh } from 'API';
import { LoginModal } from 'Components';

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const { Provider } = UserContext;

  const [ user, setUser ] = useState();
  const [ initialized, setInitialized ] = useState();
  const [ expired, setExpired ] = useState();
  const [ available, setAvailable ] = useState( true );

  useEffect(() => {
    if ( user ) {
      setExpired();
      const refreshTime = Math.max( 0, Math.min( user.left - 30000, user.left ) );
      setTimeout(() => Refresh()
        .then( user => setUser( user ))
        .catch(() => setExpired( true ))
      , refreshTime );
    }
  }, [ user ] )

  useEffect(() => {
    Resume()
      .catch( status => setAvailable( status === 403 ))
      .then( user => setUser( user ))
      .finally(() => setInitialized( true ));
  }, [] );

  return (
    <Provider value={{ user }}>
      { !initialized ? null : expired || !!user ? children : null }
      { ( expired || !user ) && initialized &&
        <LoginModal
          onLogin={ user => setUser( user ) }
          message={ !available ? 'Error: Service unavailable.' : expired ? 'Token expired.' : null }
        />
      }
    </Provider>
  )
}
