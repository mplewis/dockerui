var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './app/app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'css-loader' },
      { test: /\.(otf|eot|svg|ttf|woff|gif|png)/, loader: 'url-loader?limit=8192' }
    ]
  }
}
