import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';

import { checkAuth, logDatabase, logError, logExpress, logSocket, refreshToken, verifyCookie } from 'Environment';

import { SampleRoute, ImageRoute, LoginRoute } from 'Routes';
import { SampleHandler } from 'Handlers';
import { query } from 'Database';

const {
  CORS_WHITELIST = 'http://localhost,http://localhost:3000', // A comma-separated (no spaces) list of allowed domains
  PORT = 8080,
} = process.env;

const whiteList = CORS_WHITELIST.split( ',' );

const app = express();
const server = http.createServer( app );
const io = socketio.listen( server );

app.use( cors({
  credentials: true,
  origin: ( origin, callback ) => !origin || whiteList.indexOf( origin ) > -1 ?
    callback( null, true ) :
    callback( new Error( `Origin '${ origin }' blocked by CORS policy` ) )
}) );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( cookieParser() );

app.use( express.static( './public' ) );

// Add general express handlers here
app.post( '/', checkAuth, refreshToken );
app.get( '/', checkAuth, refreshToken );
app.get( '/status', ( req, res ) => res.status( 200 ).end() );

// Add routes here
app.use( '/sample', SampleRoute );
app.use( '/image', ImageRoute );
app.use( '/login', LoginRoute );

// Send a 404 as a fallback if no routes match
app.all( '*', checkAuth, ( req, res ) => res.status( 404 ).end() );

io
.use(( socket, next ) => {
  const { handshake: { query: { token } } } = socket;
  if ( !token ) socket.disconnect();
  verifyCookie( token )
    .then(() => next())
    .catch(() => socket.disconnect());
})
.on( 'connection', socket => {
  // Add socket handlers here
  SampleHandler( socket );
});

query( 'SELECT NOW()' )
  .then( () => logDatabase( 'Database connection established.' ))
  .catch( ({ message }) => logError( 'Database connection error:', message ));

server.listen( PORT );

console.log( '' );
logExpress( `API Server listening on port ${ chalk.greenBright( PORT ) }.` );
logSocket( `Websocket established at ${ chalk.greenBright( '/socket.io/' ) }.` );
