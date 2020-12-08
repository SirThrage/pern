import { Router } from 'express';
import path from 'path';
import multer from 'multer';

import { STORAGE_DIRECTORY } from 'Environment';
import { serveImage } from '../Environment';

const router = Router();

const imageDir = path.resolve( STORAGE_DIRECTORY, 'images' );

const allowedFileTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
]

const upload = multer({
  dest: `${ imageDir }`,
  limits: {
    fileSize: 50000000,
  },
  fileFilter: ( req, { mimetype }, cb ) => {
    if ( allowedFileTypes.indexOf( mimetype ) < 0 ) return cb( new Error( `Not allowed: '${ mimetype }'` ));
    cb( null, true );
  },
});

router.post( '/', upload.single( 'image' ), ({ file }, res ) => {
  res.json( file );
});

router.get( '/:imageId', ( req, res ) => {
  serveImage( path.join( imageDir, req.params.imageId ), res )
    .catch( error => error.code === 'ENOENT' ? res.status( 404 ).end() : res.status( 500 ).end() );
})

export const ImageRoute = router;
