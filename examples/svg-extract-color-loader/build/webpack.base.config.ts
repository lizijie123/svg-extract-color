import type {
  Configuration,
} from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as utils from '../lib/utils'
import type {
  Mode,
} from '../types/index'

const mode: Mode = process.env.NODE_ENV as Mode

const webpackBase: Configuration = {
  mode,
  module: {
    rules: [
      {
        test: /\.(t|j)s?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-typescript',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
          {
            loader: 'svg-extract-color-loader',
            options: {
              cssVariableName: '--color1',
            }
            // options: 'cssVariableName=--color1'
          },
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: utils.fixedToRelativePath('/view/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.ts'],
  },
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-source-map' : false,
}

export default webpackBase
