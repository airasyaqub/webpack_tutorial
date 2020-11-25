const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    a: './src/a.js',
    b: './src/b.js',
    // c: './src/c.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
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
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    }),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    /*https://github.com/webpack/webpack/issues/10908*/
    // minimize: false,

    splitChunks: {

      /*https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0 to understand below property */
      chunks: 'initial',

      /* Minimum size, in bytes, of a file to start splitting of that file and generate a chunk. Please note that minSize is calculated from the unminimized source code size */
      minSize: 30000,

      // minRemainingSize: 0,

      // maxSize: 10000,

      /*https://medium.com/jspoint/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312 to understand below property */
      // minChunks: 1,
      // maxAsyncRequests: 30,
      // maxInitialRequests: 30,
      // automaticNameDelimiter: '~',
      /* Size threshold at which splitting is enforced and other restrictions (minRemainingSize, maxAsyncRequests, maxInitialRequests, minSize) are ignored */
      // enforceSizeThreshold: 5000000000,
      // cacheGroups: {
      //   vendor: {
      //     chunks: 'async',
      //     test: /node_modules/,
      //     name: 'vendor'
      //   }
      // defaultVendors: {
      //   test: /[\\/]node_modules[\\/]/,
      //   priority: -10
      // },
      // default: {
      //   minChunks: 2,
      //   priority: -20,
      //   reuseExistingChunk: true
      // }
    // }
  }
},
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       // default: false,
  //       // vendors: false,
  //       // vendor chunk
  //       vendor: {
  //         // sync + async chunks
  //         chunks: 'all',
  //         // import file path containing node_modules
  //         test: /node_modules/,
  //         name: 'vendor'
  //       }
  //     }
  //   }
  // }
};
