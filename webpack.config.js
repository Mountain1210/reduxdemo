var webpack=require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const BEFORE_PATH = path.join(__dirname, './components/'); // 输出前的路径
const BUILD_PATH = path.join(__dirname, './js/'); // 最后输出放置公共资源的目录
module.exports = {
	devtool: false,//配置生成Source Maps，选择合适的选项
    entry: BEFORE_PATH+"App.js",
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,   //是一个正则，代表js或者jsx后缀的文件要使用
                loader: 'babel-loader',
                query:{
                    presets:['es2015','react'] //必须先安装babel-preset-es2015和babel-preset-react
                }
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],  //必须先安装css-loader和style-loader
　　　　　　 },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                  limit: 10000,
                  name: './build/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                  limit: 10000,
                  name: './build/fonts/[name].[hash:7].[ext]'
                }
            }　　　　
 　　　　] 
    },
    plugins:[
    	new webpack.DefinePlugin({ // <-- 减少 React 大小的关键
		  'process.env': {
			'NODE_ENV': JSON.stringify('production')
		  }
		}),
		new webpack.optimize.DedupePlugin(), //删除类似的重复代码
		new webpack.optimize.UglifyJsPlugin(), //最小化一切
		new webpack.optimize.AggressiveMergingPlugin()//合并块
    ]
};