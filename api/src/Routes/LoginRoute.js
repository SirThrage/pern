import /* bcrypt, */ { compare } from 'bcrypt';
import { query } from 'Database';
import { createCookie, logError, verifyCookie } from 'Environment';
import { Router } from 'express';

/* const { PASSWORD_SALT_ROUNDS = 10 } = process.env;

const createPassword = password => new Promise(( resolve, reject ) => bcrypt.hash( password, PASSWORD_SALT_ROUNDS, ( error, result ) => {
  if ( error ) reject( error );
  resolve( result );
}) );

createPassword( 'password' ).then( hash => console.log( hash )); */

const invalid = { code: 403, body: 'Invalid username and/or password.' };

const checkPassword = ({ username, password }) => new Promise(( resolve, reject ) => 
  query( `select password as hash from users where username = $1`, [ username ] )
    .then( ({ rows }) => {
      if ( !rows.length ) return reject( invalid )
      const { hash } = rows.pop();
      compare( password, hash )
        .then( result => {
          if ( !result ) return reject( invalid );
          resolve();
        })
        .catch( () => reject( invalid ) );
    })
    .catch( () => reject( invalid ) )
);

/** Login router. */
const router = Router();

router.post( '/', ( { body: { username, password } = {} }, res ) => {
  if ( !username ) return res.status( 400 ).send( 'missing username' );
  if ( !password ) return res.status( 400 ).send( 'missing password' );
  checkPassword({ username, password })
    .then(() => {
      const cookie = createCookie( username );
      verifyCookie( cookie )
        .then(( token ) => res.cookie( 'token', cookie ).send( token ))
        .catch(() => {
          logError( `Unable to generate cookie for user '${ username }'` );
          res.status( 500 ).send( 'Error generating token' );
        });
    })
    .catch( ({ code, body }) => res.status( code ).send( body ));
});

export const LoginRoute = router;
