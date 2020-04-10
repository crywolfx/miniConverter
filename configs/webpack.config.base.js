/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { dependencies as externals } from '../app/package.json';

export default {
  externals: [...Object.keys(externals || {})],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [['import', { libraryName: 'antd', style: true }]]
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(__dirname, '..', 'app'), 'node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.FLUENTFFMPEG_COV': false
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../node_modules/ffmpeg-static/ffmpeg'),
        to: path.resolve(__dirname, '../app/common/ffmpeg/bin/')
      }
    ])
  ]
};
