const autoprefixer = require("autoprefixer")
module.exports = {
  plugins: [
    // 'postcss-import': {},
    // 'postcss-cssnext': {},
    // 'cssnano': {}
    autoprefixer({browsers: ['last 20 versions']}),
  ]
}