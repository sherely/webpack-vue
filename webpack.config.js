var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.join(ROOT_PATH, 'src/index'); //__dirname 中的app目录，以此类推
var APP_FILE = path.join(APP_PATH, 'index.js'); //根目录文件index.js地址
var BUILD_PATH = path.join(ROOT_PATH, '/public'); //发布文件所存放的目录



module.exports = {
	// 入口文件
	entry: {
		index: APP_FILE
	},
	// 输出配置
	output: {
		// 输出路径
		path: BUILD_PATH, // 输出文件的保存路径
		filename: '[name].[hash:5].js' // 输出文件的名称
	},
	resolve: {
		extensions: ['', '.js', '.vue', '.scss', '.css'], //后缀名自动补全
		alias: {
			'Vue': 'vue/dist/vue.js'
		}
	},
	module: {

		loaders: [
			// 使用vue-loader 加载 .vue 结尾的文件
			{
				test: /\.vue$/,
				exclude: /^node_modules$/,
				loader: 'vue'
			}, {
				test: /\.json$/,
				exclude: /^node_modules$/,
				loader: "json"
			}, {
				test: /\.css$/,
				exclude: /^node_modules$/,
				loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer'])
			}, {
				test: /\.scss$/,
				exclude: /^node_modules$/,
				loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass'])
			}, {
				test: /\.(png|jpg)$/,
				exclude: /^node_modules$/,
				loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
			}, {
				test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
				exclude: /^node_modules$/,
				loader: 'file-loader?name=[name].[ext]'
			}, {
				test: /\.js$/,
				exclude: /^node_modules$/,
				loader: 'babel'
			}
		]
	},
	Favlist: {
		loaders: {
			js: 'babel'
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development') //定义编译环境
			}
		}),
		new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
			filename: './index.html', //生成的html存放路径，相对于 path
			template: './src/index/index.html', //html模板路径
			hash: false,
		}),
		new ExtractTextPlugin('[name].css')
	],
	devServer: {
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		colors: true, //终端中输出结果为彩色
		historyApiFallback: true, //不跳转
		inline: true //实时刷新，
	}
}