import chalk from 'chalk';

export const logError = function () { console.log.apply( console, [ `[${ chalk.bold.red( 'Error' ) }]`, ...Array.from( arguments ) ]); }
export const logWarn = function () { console.log.apply( console, [ `[${ chalk.bold.yellow( 'Warn' ) }]`, ...Array.from( arguments ) ]); }
export const logExpress = function () { console.log.apply( console, [ `[${ chalk.bold.greenBright( 'Express' ) }]`, ...Array.from( arguments ) ]); }
export const logSocket = function () { console.log.apply( console, [ `[${ chalk.bold.magenta( 'Socket' ) }]`, ...Array.from( arguments ) ]); }
export const logDatabase = function () { console.log.apply( console, [ `[${ chalk.bold.blueBright( 'Database' ) }]`, ...Array.from( arguments ) ]); }
