// const path = require('path');

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-env', '@babel/preset-react'], // Add @babel/preset-react here
//             },
//           },
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js'],
//     fallback: {
//       fs: false, // or require.resolve('browserify-fs')
//       path: require.resolve('path-browserify'),
//       stream: require.resolve('stream-browserify'),
//       zlib: require.resolve('browserify-zlib'),
//       assert: require.resolve('assert/'),
//       buffer: require.resolve('buffer/'),
//       util: require.resolve('util/')
//     },
//   },
// };