const path = require('path')
// __dirname:表示当前文件所在的绝对路径，path.resolve()方法用于拼接
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    // 构建依赖图的起点位置
    entry: {
        // 这里是main，那么下面生成的output的filename也是main.js
        main: path.resolve(__dirname, 'src/index.js'),
    },
    // 告诉webpack在哪里输出bundle
    // 即使可以存在多个 entry 起点，但只能指定一个 output 配置。
    output: {
        // 1. output.path-输出bundle的位置
        path: path.resolve(__dirname, 'dist'),

        // 2. output.filename-输出bundle的名字
        //    name可以用entry的key作为name
        //    contenthash可以根据内容生成hash
        filename: '[name].[contenthash].js',
        // 配置这个时，当我们的js文件变化后不会多一个文件，而是覆盖原来的
        // false时，内容变化每次就会多一个新的
        clean: true
    },
    // 配置devServer
    devServer: {
        static: {
            // 监听dist文件夹的变化
            directory: path.resolve(__dirname, 'dist'),
        },
        open: true,
        hot: true
    },
    // 如何处理项目中的不同类型的模块
    module: {
        // 这是webpack的loader能力，由于webpack只能解析JSON和JavaScript文件
        // 因此需要加载loader来将import到文件的模块（scss/css）转为依赖图的一部分
        rules: [
            {
                // 匹配这样的文件后缀
                test: /\.scss$/,
                // 使用下面的loader插件，从上到下依次执行
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            // 生成文件其实和原来功能没有不同，不同的是可以适配更古老的浏览器版本了
            {
                test: /\.js$/,
                // 排除
                exclude: /node_modules/,
                use: [
                    {
                        // 这是为了适应老的浏览器所配置的，新版本的其实webpack自身的编译已经够用了
                        // babel是为了把ES6+++编译成ES5--等版本可用的
                        loader: 'babel-loader',
                        options: {
                            // 可以在文件里进行配置
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    // 插件目的在于解决 loader 无法实现的其他事
    // loader用于转换webpack不支持的类型，plugins则用于 ：
    // 1. 打包优化 
    // 2. 资源管理
    // 3. 注入环境变量
    // 使用插件的方法：require某个插件，然后添加到plugins Array中
    // plugins比loader更强大，这里可以使用plugin来生成html文件
    // 将演示一下如何让npm run build自动生成dist文件和html文件
    //html-webpack-plugin
    plugins: [
        new HtmlWebpackPlugin({
            title: 'charry webpack',
            // 每次build都会覆盖上一次的html
            filename: 'index.html',
            // 没有template的话，生成的index.html会是body都是空的
            // 添加template的话就是按照template来生成
            template: './src/public/index.html'
        })
    ]
    // html-webpack-plugin 为应用程序生成一个 HTML 文件，
    // 并自动将生成的所有 bundle 注入到此文件中
}




// 1. 从入口点开始构建依赖图（）
// webpack 只能理解 JavaScript 和 JSON 文件