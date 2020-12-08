import { verify, TokenExpiredError, sign } from 'jsonwebtoken';

const {
  TOKEN_SECRET = 'CHANGE_ME',
  // 1 day = 86400000, 5 minutes = 300000
  TOKEN_EXPIRE_MS = 86400000,
} = process.env;

export const checkAuth = ( req, res, next ) => {
  const { cookies: { token } } = req;

  verifyCookie( token )
    .then( token => {
      req.token = token;
      next();
    })
    .catch( err => res.status( 403 ).send( err instanceof TokenExpiredError ? 'Token expired' : null ));
}

export const createCookie = username => sign({ username }, TOKEN_SECRET, {
  algorithm: "HS256",
  expiresIn: `${ Math.max( ( TOKEN_EXPIRE_MS || 0 ), 300000 ) }ms`,
})

export const verifyCookie = async token => verify( token, TOKEN_SECRET, ( err, token ) => {
  if ( err ) return Promise.reject( err );
  return Promise.resolve({ ...token, left: token.exp * 1000 - new Date().getTime() });
})

export const refreshToken = ( { token: { username } }, res ) => {
  const cookie = createCookie( username );
  verifyCookie( cookie ).then( token => res.cookie( 'token', cookie ).send( token ));
}
