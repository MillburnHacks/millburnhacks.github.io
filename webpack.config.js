module.exports = {
  devtool: 'inline-source-map',
  entry: __dirname + '/app/main.jsx',
  output: {
    path: "dist",
    filename: 'bundle.js',
    publicPath: "/dist/"
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        loader : 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
}
