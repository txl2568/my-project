module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({ // 把px单位换算成rem单位
                        rootValue: 75, // 换算的基数(设计图750的根字体为75)
                        propList: ['*']//*代表将项目中的全部进行转换，单个转换如width、height等
                    })
                ]
            }
        }
    },
    devServer: {
        disableHostCheck: true,
        port: 8080, // 端口配置
        open: true, //打开浏览器
        host: '0.0.0.0', //所有的地址都能访问
        // 反向代理配置
        proxy: {
            '/api': {
                // target: 'http://static.sjjwxt.com/',
                target: 'http://192.168.0.41:9000/',
                // target: 'http://192.168.0.15:9000/',
                changeOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
   
};