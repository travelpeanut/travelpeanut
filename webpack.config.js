const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpack = require('webpack')


// WEBPACK 2 CONFIG

// module.exports = {
//   entry: `${SRC_DIR}/index.jsx`,
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR,
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?/,
//         include: SRC_DIR,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015'],
//           plugins: ["transform-object-rest-spread"]
//         },
//       },
//       { test: /\.css$/, use: ['style-loader', 'css-loader'] },
//       {
//         test: /\.(pdf|jpg|png|gif|svg|ico)$/,
//         use: [
//             {
//                 loader: 'url-loader'
//             }
//         ]
//       }
//     ],
//   },
// };

// // WEBPACK 4 CONFIG
// // FROM VANESSA

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
// 	entry: './client/src/index.jsx',
// 	output: {
// 		path: path.join(__dirname, '/client/dist'),
// 		filename: 'bundle.js'
// 	},
// 	module: {
// 		rules: [
//           {
//           	test: /\.jsx/,
//           	exclude: /node_modules/,
//           	use: {
//           		loader: 'babel-loader',
//           	}
//           }
//         ]
// 	},
// 	plugins: [
//       new HtmlWebpackPlugin({
//         template: './client/src/index.html'
// 				}),
// 			new BundleAnalyzerPlugin()
// 	]
// }


// Our Webpack 4 CONFIG

module.exports = {
	entry: `${SRC_DIR}/index.jsx`,
	output: {
		path: DIST_DIR,
		filename: 'bundle.js'
	},
	module: {
		rules: [
          {
          	test: /\.jsx/,
            include: SRC_DIR,
          	exclude: /node_modules/,          	
            loader: 'babel-loader',
          	options: {
              presets: ['react', 'es2015'],
              plugins: ['transform-object-rest-spread']
            }
          },
          {
            test: /\.css$/,
            use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
          },
          {
            test: /\.(pdf|jpg|png|gif|svg|ico)$/,
            use: [
                {loader: 'url-loader'},
                {loader: 'image-webpack-loader'}
            ] 
          }
        ]
  },	
  plugins: [
    new BundleAnalyzerPlugin(),
    new UglifyJsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
