const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'src');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: 'React4ColorPicker',
    libraryTarget: 'umd',
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: [
        SRC_DIR,
        path.join(__dirname, 'index'),
      ],
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus'),
    }],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin('index.css', {
      allChunks: true,
    }),
    new WriteFilePlugin({
      test: /\.css$/,
    }),
  ],
  resolve: { extensions: ['', '.jsx', '.js', '.css', '.styl'] },
};
