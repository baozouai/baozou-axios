const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const prodConfig = require('./webpack.pro')
const devConfig = require('./webpack.dev')

const commonConfig = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].[hash:6].js',
    // 类库的命名空间，如通过网页引入，则可以通过window.axios访问
    library: 'axios',
    // 定义全局变量，兼容node和浏览器，避免出现window is not defined
    globalObject: 'this',
    libraryTarget: 'umd',
    // 对外暴露default属性，就可以直接调用default里的属性
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
}

module.exports = () => {
  const isProduction = process.env.NODE_ENV === 'production'
  return merge(commonConfig, isProduction ? prodConfig: devConfig)
}