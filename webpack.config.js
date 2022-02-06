/* eslint-disable */
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const getFilename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "../src/index.js",
  output: {
    filename: `./${getFilename("js")}`,
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 4000,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      filename: "index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./${getFilename("css")}`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader", // update html file on save
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // update css file on save
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // parse js to old versions for old browsers
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
