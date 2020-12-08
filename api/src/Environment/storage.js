import path from 'path';
import readChunk from 'read-chunk';
import imageType from 'image-type';
import fs from 'fs';
import { logExpress } from '.';

const {
  STORAGE_ROOT = './',
} = process.env;

export const {
  STORAGE_DIRECTORY = path.resolve( STORAGE_ROOT || path.parse( process.cwd() ).root, 'storage' ),
} = process.env;

fs.stat( STORAGE_DIRECTORY, err =>
  // If there is no storage directory, create one.
  err && logExpress( `Creating storage directory at path '${ STORAGE_DIRECTORY }'` ));

[
  '/', // Create the base storage directory.
  // List any additional subdirectories here, in order, i.e. 'images/', 'images/avatars/'
  'images/',
].forEach( dir => fs.mkdirSync( path.resolve( `${ STORAGE_DIRECTORY }/${ dir }` ), { recursive: true }));

export const serveImage = async ( image, res ) => readChunk( image, 0, 12 )
  .then( result => {
    res.set( 'Content-Type', imageType( result ).mime );
    fs.createReadStream( image ).pipe( res );
    return Promise.resolve();
  })
  .catch( error => Promise.reject( error ) );

