import config from '../config'
import { resolve } from 'path'
import { makeRule } from '../tools/helpers'

import { DefinePlugin } from 'webpack'
import LogCompilerErrorsPlugin from './plugins/logCompilerErrors'
import WriteBundlePathsToJSONPlugin from './plugins/WriteBundlePathsToJSON'

const DEBUG = config.env !== 'production'

export default {
  entry: {
    server: resolve(__dirname, '../src/server/index.js')
  },
  output: {
    path: './bundles',
    pathinfo: DEBUG,
    publicPath: './public',
    libraryTarget: 'umd',
    umdNamedDefine: false,
    filename: `[name].js`
  },
  target: 'node',
  module: {
    rules: [
      makeRule(/\.jsx?$/, 'standard-loader', 'pre'),
      makeRule(/\.jsx?$/, 'babel-loader')
    ]
  },
  plugins: [
    new DefinePlugin({config: JSON.stringify(config)}),
    new LogCompilerErrorsPlugin(),
    new WriteBundlePathsToJSONPlugin()
  ],
  stats: {
    chunks: true, // Makes the build much quieter
    colors: true, // Shows colors in the console
    hash: true,
    version: false,
    timings: true
  }
}
