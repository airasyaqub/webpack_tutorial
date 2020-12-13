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
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: /node_modules/,
        }
      }
    }
  }
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
