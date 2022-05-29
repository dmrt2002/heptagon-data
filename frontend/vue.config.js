const path = require('path');
module.exports = {
  outputDir: path.resolve(__dirname, '../dist'),
  devServer: {
    proxy : "http://localhost:5000"
  },
  chainWebpack: config => {
    config.module
      .rule("pdf")
      .test(/\.pdf$/)
      .use("file-loader")
      .loader("file-loader");
    }
  }

