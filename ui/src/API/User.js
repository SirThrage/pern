import { API } from "API";

export const GetCookie = () => Object.fromEntries( [ document.cookie.split( '=' ) ] );
const DeleteToken = () => document.cookie = `token=;path=/;max-age=-1`;

export const Login = ({ username, password }) =>
  API.post( 'login', { username, password })
    .then( ({ data }) => Promise.resolve( data ))
    .catch( ({ response: { status } = {} }) =>
      Promise.reject( status === 403 ? 'Access Denied: Invalid username and/or password.' : status === 500 ? 'Error: Database unavailable.' : 'Error: Service unavailable.' ) );


export const Resume = () => {
  const cookie = GetCookie();
  const { token } = cookie;
  
  return !token || token.length < 1 ? Promise.reject( 403 ) : API.post()
  .then( ({ data }) => Promise.resolve( data ))
  .catch( ({ request: { status } }) => {
    status === 403 && DeleteToken();
    return Promise.reject( status );
  });
}

export const Refresh = () => API.get( '/' )
  .then( ({ data }) => Promise.resolve( data ))
  .catch(() => Promise.reject( DeleteToken() ));
    