/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env = require('yargs').argv.env;
const pkg = require('./package.json');

let libraryName = pkg.name;

let plugins = [],
    outputExt,
    devtool,
    libraryExport;

switch (env) {
  case 'es':
    outputExt = '.es.js';
    break;
  case 'browser-min':
    outputExt = '.min.js';
    libraryExport = 'default';
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    break;
 default:
    outputExt = '.js';
    devtool = 'source-map';
    libraryExport = 'default';
}

const config = {
  entry: __dirname + '/src/pomelog.ts',
  devtool: devtool,
  output: {
    path: __dirname + '/dist',
    filename: libraryName + outputExt,
    library: libraryName,
    libraryTarget: 'umd',
    libraryExport: libraryExport,
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.ts)$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: plugins
};

module.exports = config;
