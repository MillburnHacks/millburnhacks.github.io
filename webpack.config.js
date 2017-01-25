module.exports = {
  devtool: 'inline-source-map',
  entry: __dirname + '/app/app.jsx',
  output: {
    path: "dist",
    filename: 'bundle.js'
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