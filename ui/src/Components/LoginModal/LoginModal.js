import React, { useState } from 'react';
import { Login } from 'API';

import { Modal, Panel } from 'Components';

import './LoginModal.scss';

export const LoginModal = ({ className, onLogin, message, ...props }) => {
  const [ loading, setLoading ] = useState();
  const [ username, setUsername ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ status, setStatus ] = useState( message || 'Enter a username and password.' );

  const handleLogin = () => {
    setLoading( true );
    setStatus( 'Logging in ...' );
    Login({ username, password })
      .then( onLogin )
      .catch( error => {
        setStatus( error );
        setLoading( false );
      });
  }

  return (
    <Modal
      persistent
      className={ `login-modal${ className ? ` ${ className }` : '' }` }
      { ...props }
    >
      <Panel>
        <div className="login-message">
          <span>&nbsp;{ status }&nbsp;</span>
        </div>
        <form>
          <fieldset className="login-fields" disabled={ loading }>
            <input
              autoFocus
              autoComplete="current-username"
              placeholder="Username"
              value={ username }
              onChange={ ({ target: { value } }) => setUsername( value ) }
            />
            <input
              placeholder="Password"
              autoComplete="current-password"
              type="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword( value ) }
            />
            <button onClick={ handleLogin } disabled={ !username.length || !password.length }>Login</button>
          </fieldset>
        </form>
      </Panel>
    </Modal>
  )
}
