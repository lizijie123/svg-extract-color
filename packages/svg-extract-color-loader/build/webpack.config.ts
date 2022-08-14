import webpackMerge from 'webpack-merge'
import * as utils from 'compire-utils'
import type {
  Configuration,
} from 'webpack'
import webpackBaseConfig from './webpack.base.config'

const webpackConfig: Configuration = {
  entry: utils.fixedToRelativePath('/app/index'),
  output: {
    path: utils.fixedToRelativePath('/dist'),
    filename: 'index.js',
    library: {
      type: 'umd',
    },
  },
  cache: process.env.NODE_ENV === 'development' ? {
    // 缓存至磁盘
    type: 'filesystem',
    // 缓存路径
    buildDependencies: {
      // 缓存依赖列表，效果同hooks
      config: [__filename],
    },
    name: 'cache',
  } : false,
}

export default webpackMerge(webpackConfig, webpackBaseConfig)
