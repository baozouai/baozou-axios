const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

  ],
  devServer: {
    open: true,
    hot: true,
    compress: true,
  },
  devtool: 'eval-cheap-source-map',
}