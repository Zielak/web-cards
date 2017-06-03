const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

module.exports = {
	entry: {
		'index.js': './scripts/index.js',
		'material-components-web.js': './node_modules/material-components-web/dist/material-components-web.js',
		'material-components-web.css': './node_modules/material-components-web/dist/material-components-web.css',
	},
	output: {
		filename: '[name]',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		loaders: [
			{
				test: /.js$/,
				exclude: /(node_modules)/,
				loaders: 'buble-loader',
				include: path.join(__dirname, 'scripts'),
				query: {
					objectAssign: 'Object.assign'
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	plugins: [new HtmlWebpackPlugin({
		title: 'Cards game',
		template: './template/index.ejs'
	})]
};
