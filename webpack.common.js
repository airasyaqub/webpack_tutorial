const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {

  // target: "node",

  entry: {
    a: './src/a.js',
    b: './src/b.js',
    c: './src/c.js',
  },

  // resolve: {
  //   extensions: ['.ts', '.js'],
  // },

  module: {
    rules: [
      // {
      //   test: /\.tsx?/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
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
    minimize: false,
    // runtimeChunk: {
    //   name: 'runtime'
    // },
    // moduleIds: 'hashed',
    // chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        default: false, // disable the built-in groups, default & vendors (vendors is overwritten below)
        vendors: { // picks up everything from node_modules as long as the sum of node modules is larger than minSize
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 3,
          chunks: 'initial',
          enforce: true, // causes maxInitialRequests to be ignored, minSize still respected if specified in cacheGroup
          // minSize: 30000 // use the default minSize
        },
        vendorsAsync: { // vendors async chunk, remaining asynchronously used node modules as single chunk file
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors.async',
          chunks: 'async',
          priority: 2,
          // reuseExistingChunk: true,
          minSize: 10000  // use smaller minSize to avoid too much potential bundle bloat due to module duplication.
        },
        commonsAsync: { // commons async chunk, remaining asynchronously used modules as single chunk file
          name: 'commons.async',
          minChunks: 2, // Minimum number of chunks that must share a module before splitting
          chunks: 'async',
          priority: 1,
          reuseExistingChunk: true,
          minSize: 10000  // use smaller minSize to avoid too much potential bundle bloat due to module duplication.
        }
      }

    }
  }
};





/* First code segmentation/optimization will be performed for every entry point. async a.js -> myday.js -> main.scss will be split to its separate chunk.
async b.js -> dependencies.js will be in separate chunk. async c.js -> dependencies.js & async c.js -> myday.js will be in their respective separate chunk.
c.js ->  myday.js -> main.scss will be in separate chunk.

Now webpack will further optimize these segmented chunks. For a.js webpack will see sync a.js -> dependencies.js -> main.scss & sync a.js -> myday.js -> main.scss
separated chunk. It will decide to keep sync main.scss and discard async main.scss chunk. For b.js no optimization. For c.js it will see overlap between 
c.js -> dependencies.js & b.js -> dependencies.js so merge them as one chunk referred by both b.js & c.js.

Now webpack will merge these optimized chunks in cache groups. a.js -> dependencies.js -> node_modules will go in vendor initial group.
a.js -> myday.js -> node_modules will go in vendor initial group.'Async' on a cacheGroup means that the cacheGroup can 
only contain modules that are imported inside asynchronously loaded modules. So node modules in Async dependencies.js chunk referred by both b.js & c.js
will go in vendor async group. c.js -> myday.js -> node_modules will go in vendor async group.

Now remaining we have one async dependencies.js chunk with main.scss in it and splitted out async c.js ->  myday.js -> main.scss. webpack will make a 
new chunk with c.js ->  myday.js -> main.scss which will include main.scss. It will be referred by both b.js and c.js

If you change commonsAsync to 'all' we will get common chunk  with main.scss in it. Its because it satisfy condition of any module which is part of 
at least 2 chunks. main.scss is part of a.js and separated jee-module chunks. So it will be merged in commonsAsync.

*/