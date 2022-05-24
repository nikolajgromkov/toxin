const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const IS_DEV = true

const js = {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: 'babel-loader'
}

const css = {
	test: /\.css$/i,
	use: [MiniCssExtractPlugin.loader, "css-loader"],
}

const scss = {
	test: /\.scss$/,
	use: [
		IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
		'css-loader',
		'sass-loader'
	]
}
const img = {
	test: /\.(gif|png|jpe?g|svg)$/i,
	use: [
		{
			loader: 'url-loader',
			options: {
				limit: 8192,
				name: '[name].[ext]',
				fallback: 'file-loader',
				outputPath: 'public/images'
			}
		},
		{
			loader: 'image-webpack-loader',
			options: {
				bypassOnDebug: true,
				mozjpeg: {
					progressive: true,
					quality: 75
				}
			}
		}
	]
}

const pug = {
	test: /\.pug$/,
	include: path.join(__dirname, 'src'),
	loader: '@webdiscus/pug-loader'
}

const fonts = {
	test: /\.(woff|woff2|eot|ttf|otf)$/i,
	type: 'asset/resource',
};


const config = {
	mode: IS_DEV ? 'development' : 'production',
	devtool: IS_DEV ? 'eval' : 'source-map',
	entry: {
		index: './src/js/index.js',
		button: './src/components/UI/button'
	},
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [js, css, scss, img, pug, fonts]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
            "patterns": [{
				from: './src/public', to: 'public'
			}
		]
        }),
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, './src/index.pug'),
			favicon: path.resolve(__dirname, './src/public/ico/favicon.ico'),
			minify: !IS_DEV && {
				collapseWhitespace: true,
				preserveLineBreaks: true,
				removeComments: true
			}
		}),
		new HtmlWebPackPlugin({  // Also generate a test.html
			template: path.resolve(__dirname, './src/uikit.pug'),
			filename: 'uikit.html'
		}),
		new MiniCssExtractPlugin({
			filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash].css',
			chunkFilename: 'css/[id].css'
		}),
		new webpack.ids.HashedModuleIdsPlugin()
	],
	devServer: {
		static: {
            directory: path.join(__dirname, "src")
          },
      
          compress: true,
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				}
			}
		},
		minimizer: []
	}
}

if (!IS_DEV) {
	const TerserPlugin = require('terser-webpack-plugin')
	const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

	config.optimization.minimizer.push(
		new TerserPlugin(),
		new OptimizeCSSAssetsPlugin({})
	)
}

module.exports = config
