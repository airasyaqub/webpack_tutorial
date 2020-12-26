const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    a: './src/a.js',
    // b: './src/b.js',
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
        vendors: false,
        default: {
          // chunks: 'async',
          minSize: 40,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          // enforce: true
        }
      }
    }
  }
};


/*

1- minChunks tells SplitChunksPlugin to only inject module inside common chunk if and only if they are shared between at least 2 chunks 
(sync or async because of all value of chunks)

2- minSize tells SplitChunksPlugin to only create chunk if resulting/new chunk size in greater or equal to minSize.

*/
