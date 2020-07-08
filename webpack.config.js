const path = require('path');
const uglifyjsPlugin = require('uglifyjs-webpack-plugin');  //js压缩

module.exports = {
    //入口文件的配置项
    entry: {
        entry: './src/index.js'
    },
    //出口文件的配置项
    output: {
        //输出的路径，用了Node语法
        path: path.resolve(__dirname, 'dist'),
        //输出的文件名称
        filename: 'main.js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {

        rules: [
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            }
        ]

    },
    //插件，用于生产模版和各项功能
    plugins: [
        new uglifyjsPlugin({
            mangle: {
                // 关键词过滤
                except: ['$super', '$', 'exports', 'require']
            }
        })
    ]
}