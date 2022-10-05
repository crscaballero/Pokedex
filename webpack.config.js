const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const { presets, plugins } = require(`${appDirectory}/babel.config.js`);

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'rnw.bundle.js',
  },
  resolve: {
    extensions: [
      '.web.js',
      '.js',
      '.web.ts',
      '.ts',
      '.web.jsx',
      '.jsx',
      '.web.tsx',
      '.tsx',
      '.css',
      '.json',
    ],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      {
        test: /\\\\.ts$|tsx?$/,
        // Add every directory that needs to be compiled by Babel during the build.
        include: [
          path.resolve(__dirname, 'index.web.js'), // Entry to your application
          path.resolve(__dirname, 'src/App.tsx'), // Change this to your main App file
          path.resolve(__dirname, 'src'),
          // path.resolve(__dirname, 'component'),
          [
            // Add every react-native package that needs compiling
            'react-native-gesture-handler',
          ].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`)),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets,
            plugins,
          },
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            esModule: false,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(react-native-elements|react-native-vector-icons)\/).*/,
        loader: 'babel-loader'
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(__dirname, "node_modules/react-native-vector-icons")
      }
    ],
  },
  devServer: {
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: <https://github.com/necolas/react-native-web/issues/349>
      __DEV__: JSON.stringify(true),
    }),
  ],
};
