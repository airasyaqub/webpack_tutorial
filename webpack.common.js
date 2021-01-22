const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {

  // target: "node",

  entry: {
    a: './src/a.ts',
    // b: './src/b.js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
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
