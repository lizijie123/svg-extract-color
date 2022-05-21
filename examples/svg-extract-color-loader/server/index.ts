import fs from 'fs'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import bodyParser from 'body-parser'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../build/webpack.config'
import * as utils from '../lib/utils'

const app = express()

// 处理请求体参数
app.use(bodyParser.json({ limit: 1024 * 1024 * 10 }))

// CORS
app.use('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,OPTIONS,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

if (process.env.__ENV__ === 'development') {
  // 开发环境热更新
  webpackConfig.entry = ['webpack-hot-middleware/client', webpackConfig.entry[0]]
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  )
  const compiler = webpack(webpackConfig)
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })

  const fsMemory = middleware.context.outputFileSystem

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.get('*', (req, res) => {
    fsMemory.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        console.warn(err)
        res.send(err)
      } else {
        res.send(file.toString())
      }
    })
  })
} else {
  // 生产环境做静态资源服务器
  app.use('/dist', express.static(path.join(__dirname, '../dist/static'), { maxAge: 30 * 24 * 60 * 60 * 1000 }))

  app.get('*', (req, res) => {
    const print = fs.readFileSync(utils.fixedToRelativePath('/dist/index.html'), 'utf-8')
    res.send(print)
  })
}

app.listen(process.env.__PORT__, async (err) => {
  if (err) {
    console.log(err)
  }
  if (process.env.NODE_ENV === 'development') {
    console.log(`

    running at:
    - Local:   http://localhost:${process.env.__PORT__}
               https://localhost:${Number.parseInt(process.env.__PORT__, 10) + 1}

  `)
  } else {
    console.log(`

    running port: ${process.env.__PORT__}

    `)
  }
})
