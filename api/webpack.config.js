const path = require('path');
const nodeExternals = require( 'webpack-node-externals' );
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  target: 'node',
  output: {
    path: path.resolve( __dirname, 'build' ),
    filename: 'index.js'
  },
  externals: [
    nodeExternals(),
  ],
  resolve: {
    alias: {
      App: path.resolve( __dirname, 'src/App' ),
      Environment: path.resolve( __dirname, 'src/Environment' ),
      Routes: path.resolve( __dirname, 'src/Routes' ),
      Handlers: path.resolve( __dirname, 'src/Handlers' ),
      Database: path.resolve( __dirname, 'src/Database' ),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: path.resolve( __dirname, 'public' ), to: 'public' },
      ],
    }),
  ],
};
