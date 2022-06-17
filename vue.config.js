module.exports = {
  // 很多博文说把路径配置为'./'就行。但是我配置为'./'路径依然不对
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  assetsDir: "static",
  devServer: {
    proxy: {
      "/api": {
        target: "https://yuanxiapi.cn/api/Aword", //请求对象
        ws: true, //代理websocked
        changeOrigin: true,
        secure: false, //target是否为https接口
        pathRewrite: {
          "^/api": "", //更改请求URL
        },
      },
    },
  },
};
