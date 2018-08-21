const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry : './index.js',
	output : {
		path:__dirname,
		filename : "release.js"
	},
	mode : "production",
	module : {
		rules:[
		{
			test:/\.css$/,
			loader : "css-loader"
		},
		{
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			loader: 'file-loader'
		},
		{
            test: /\.vue$/,
            loader: 'vue'
        }
        ]
	},
	plugins : [
		new UglifyJsPlugin({
			uglifyOptions: {
				compress : {
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}	
		})
	]
}
