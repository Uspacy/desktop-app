import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, container } from 'webpack';

const { ModuleFederationPlugin } = container;
const deps = require('./package.json').dependencies;

const isDev = process.env.NODE_ENV === 'development';

const common: Configuration = {
	mode: isDev ? 'development' : 'production',
	externals: ['fsevents'],
	output: {
		publicPath: './',
		filename: '[name].js',
		assetModuleFilename: 'assets/[name][ext]',
	},
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(ico|png|svg|eot|woff?2?)$/,
				type: 'asset/resource',
			},
		],
	},
	watch: isDev,
	devtool: isDev ? 'source-map' : undefined,
};

const main: Configuration = {
	...common,
	target: 'electron-main',
	entry: {
		main: './src/main.ts',
	},
};

const preload: Configuration = {
	...common,
	target: 'electron-preload',
	entry: {
		preload: './src/preload.ts',
	},
};

export const renderer: Configuration = {
	...common,
	target: 'web',
	entry: {
		app: './src/web/index.tsx',
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new ModuleFederationPlugin({
			name: 'desktopApp',
			filename: 'remoteEntry.js',
			shared: {
				react: {
					requiredVersion: deps.react,
					singleton: true,
				},
				'react-dom': {
					requiredVersion: deps['react-dom'],
					singleton: true,
				},
			},
		}),
		new HtmlWebpackPlugin({
			inject: 'body',
			template: './src/web/index.html',
			// excludeChunks: ["desktopApp"],
		}),
	],
};

export default [main, preload];
