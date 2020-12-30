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
      chunks: "initial"
    }
  }
};


/* 

1- Build and there will be one vendor chunk and one main.css chunk due to default cache group.

2- now remove bootstrap from b.js. you will notice two vendor chunk with bootstrap and lodash respectively. main.css is not splitted to separate chunk because
maxInitialRequests: 3. It means only max 3 parallel requests on initial page load. vendor-bootstrap, vendor-lodash, main.scss, a.js will be chunks if splitted 
main.scss which is not maxInitialRequests: 3.

3- Do maxInitialRequests: 4 and you will notice now main.scss is in a new separate chunk.

*/