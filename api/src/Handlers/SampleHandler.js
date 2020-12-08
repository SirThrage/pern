import { logSocket } from 'Environment';

export const SampleHandler = socket => {
  socket.on( 'test', () => {
    const rando = Math.floor( Math.random() * 100000 );
    logSocket( `Got socket test from a client, sending response: ${ rando }` );
    socket.emit( 'test', rando );
  });
}
