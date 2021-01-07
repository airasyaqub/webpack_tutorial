const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    a: './src/a.js',
    b: './src/b.js',
    c: './src/c.js'
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
    minimize: false,
    splitChunks: {
      cacheGroups: {
        default: {
          chunks: 'async',
          name: 'common',
          minChunks: 2,
          priority: 10,
        },
        vendors: {
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
          test: /[\\/]node_modules[\\/]/,
        }
      }
    }
  }
};


/*

1- In initial config build will output one vendor chunk as initial from a.js. But only one async chunk with no 'common' name as it should because 
the default chunk says 'get me all the modules in async chunk and these modules should be used in minimum two async chunks'. There are two dependencies.js
called async way. Then why there is no 'common' chunk. We will get answer in next config.

2- If we change minCHunks in default to 1 we will see common chunk. This means webpack is splitting out only one dependencies.js as split point
async chunk. For this weird behaviour we have open up an issue too because we thought that before splitchunksplugin hit in, all dynamic entry point chunks 
will be splitted out as async chunks. https://stackoverflow.com/questions/65608885/unpredictable-behaviors-of-webpack-code-splitting

3-If we include main.scss in c.js file apart from dependencies.js too. We will see expected behaviors. One initial vendor chunk from a.js. main.scss remains in
a.js. One common chunk with lodash and bootstrap as they are been called in two async chunk (dependencies.js). 'b.js' has spitted out main.scss to new async chunk 
because it neither can get into vendor initial chunk nor default chunk as main.scss is being used in only one async chunk and that is in dependencies.js of
b.js. c.js has main.scss in its own file too, that is what changed the output from point 1.


*/