const path = require('path');
const { merge } = require( 'webpack-merge' );
const common = require( './webpack.config' );
const webpack = require( 'webpack' );
const dotenv = require( 'dotenv' ).config({ path: path.resolve( __dirname, ( '.env.production' ) ) });

module.exports = merge( common, {
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin( dotenv.parsed || {} ),
  ]
});
