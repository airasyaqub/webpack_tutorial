const path = require("path");
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


module.exports = merge(common, {
  mode: "production",
  devtool: "hidden-source-map",
  // devtool: "source-map",
  output: {
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, "dist"),
    // publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract CSS into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      // minify: {
      //   removeAttributeQuotes: true,
      //   collapseWhitespace: true,
      //   removeComments: true
      // }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin()

  ]
});
