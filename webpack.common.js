const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    a: './src/a.js',
    // b: './src/b.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[contenthash].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ]
  },
  optimization: {
    // minimize: false,
    runtimeChunk: {
      name: 'runtime'
    },
    moduleIds: 'hashed',
    // chunkIds: 'named',
    splitChunks: {
      chunks: "all"
    }
  }
};
