const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const { presets, plugins } = require(`${appDirectory}/babel.config.js`);

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: '[name].rnw.bundle.js',
    chunkFilename: '[name].rnw.bundle.js',
  },
  resolve: {
    extensions: [
      '.web.js',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
    ],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: [ // Add every directory that needs to be compiled by Babel during the build.
          path.resolve(__dirname, 'index.web.js'), // Entry to your application
          path.resolve(__dirname, 'src'),
          [ // Add every react-native package that needs compiling
            'react-native-reanimated',
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
        include: path.resolve(__dirname, 'node_modules/react-native-vector-icons')
      },
    ],
  },
  devServer: {
		port: 3000,
    open: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      filename: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: <https://github.com/necolas/react-native-web/issues/349>
      __DEV__: JSON.stringify(true),
    }),
    new CopyWebpackPlugin({ // Used to copy assets on public into dist folter
      patterns: [
        {
          from: path.resolve(__dirname, 'public', 'assets'),
          to: 'assets'
        },
        {
          from: path.resolve(__dirname, 'public', 'favicon.png'),
          to: 'favicon.png'
        },
        {
          from: path.resolve(__dirname, 'public', 'manifest.json'),
          to: 'manifest.json'
        },
        {
          from: path.resolve(__dirname, 'public', 'robots.txt'),
          to: 'robots.txt'
        },
        {
          from: path.resolve(__dirname, 'public', 'sitemap.xml'),
          to: 'sitemap.xml'
        }
      ]
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['optipng', { optimizationLevel: 5 }],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
};
