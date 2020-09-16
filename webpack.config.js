const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    hot: true,
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Unity WebGL Player',
      template: 'index.template.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/TemplateData', to: 'TemplateData' },
      ],
    }),
    new webpack.EnvironmentPlugin({
      'WEBGL_LOADER_URL': 'Build/unity-webgl-player.loader.js',
      'WEBGL_DATA_URL': 'Build/unity-webgl-player.data',
      'WEBGL_FRAMEWORK_URL': 'Build/unity-webgl-player.framework.js',
      'WEBGL_CODE_URL': 'Build/unity-webgl-player.wasm',
      'WEBGL_STREAMING_ASSETS_URL': 'StreamingAssets',
      'COMPANY_NAME': 'Default Company LLC',
      'PRODUCT_NAME': 'Video Game Title',
      'PRODUCT_VERSION': '0.0.1',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
