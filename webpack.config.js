const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    bundle: [ '@babel/polyfill', './src/index.js' ]
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'hash-anticipation-calc-lib.min.js',
    library: 'HashAnticipationCalcLib'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader',
        query: {
          presets: [['@babel/env', { targets: { browsers: ['> 1%',
            'Firefox >= 52',
            'ie >= 11',
            'safari >= 7',
            'Chrome >= 55'] } }]],
          plugins: ['@babel/plugin-transform-runtime',
            '@babel/plugin-transform-arrow-functions'
          ]
        }
      },
    ],
  }
}
