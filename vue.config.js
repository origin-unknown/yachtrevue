module.exports = {
  // outputDir: "../flask_yacht/yacht/dist",
  indexPath: "templates/index.html",
  assetsDir: "static",
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        },
        logLevel: 'debug'
      }
    }
  }
};
