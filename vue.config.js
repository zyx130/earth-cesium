module.exports = {
    publicPath: './',
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/style/_variable.scss";`
            }
        }
    },
    devServer: {
        open: true, // 设置项目打开后浏览器自动打开
        disableHostCheck: true,
    }
}