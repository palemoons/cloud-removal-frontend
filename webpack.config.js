const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.js',
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.less$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset',
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
          loader: 'svg-react-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'static/[name].[chunkhash:8].js',
    assetModuleFilename: isDev
      ? 'static/[name].[hash][ext]'
      : 'static/[hash][ext]',
    clean: true,
  },
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, '/'),
    },
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimize: !isDev,
    minimizer: [new TerserPlugin()],
  },
};
