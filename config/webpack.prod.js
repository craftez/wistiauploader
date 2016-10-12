const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

// webpack plugins
const WebpackMd5Hash = require('webpack-md5-hash');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');


module.exports = webpackMerge(commonConfig, {

  debug: false,

  devtool: 'cheap-module-source-map',


  output: {

    path: path.join(__dirname, '..', 'dist'),

    filename: '[name].[chunkhash].bundle.js',

    sourceMapFilename: '[name].[chunkhash].bundle.map',

    chunkFilename: '[id].[chunkhash].chunk.js'

  },

  plugins: [

    new WebpackMd5Hash(),

    new DedupePlugin(),

    new UglifyJsPlugin({

        beautify: false,
        mangle: true,
        compress: {
            warnings: false,
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        }
     })

  ]

});