const config = {
  entry: './src/app.js',
  output: {
    path: './build',
    filename: 'app.js'
  },
  external: ['angular'],
  watch : true
}
module.exports = config;
