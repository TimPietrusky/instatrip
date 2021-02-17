// const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'app.min.js',
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
});
