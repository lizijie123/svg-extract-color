import fs from 'fs'
import { RollupOptions } from 'rollup'
import rollupPluginDts from 'rollup-plugin-dts'
import rollupPluginBabel from '@rollup/plugin-babel'
import rollupPluginAlias from '@rollup/plugin-alias'
import rollupPluginCommonjs from 'rollup-plugin-commonjs'
import rollupPluginNodeResolve from 'rollup-plugin-node-resolve'

const extensions = ['.ts', '.js']
const tsConfig = JSON.parse(fs.readFileSync(`${process.cwd()}/tsconfig.json`, 'utf-8'))

const config = [
  {
    input: 'app/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: process.env.NODE_ENV === 'development',
      },
      {
        dir: 'es',
        format: 'esm',
        sourcemap: process.env.NODE_ENV === 'development',
      }
    ],
    plugins: [
      rollupPluginNodeResolve({
        extensions,
      }),
      rollupPluginCommonjs(),
      rollupPluginBabel({
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
        ],
        exclude: /node_modules/,
        extensions,
        babelHelpers: 'runtime',
      }),
      rollupPluginAlias({
        entries: [
          {
            find: '@',
            replacement: `${process.cwd()}/app`,
          },
          {
            find: '@defineds',
            replacement: `${process.cwd()}/app/defineds`,
          },
          {
            find: '@utils',
            replacement: `${process.cwd()}/app/utils`,
          }
        ]
      }),
    ],
    external: [
      /@babel\/runtime/,
    ],
  },
  {
    // 入口配置
    input: 'app/index.ts',
    // 出口配置
    output: [
      {
        file: 'es/index.d.ts',
        format: 'esm',
      },
    ],
    plugins: [
      rollupPluginDts({
        compilerOptions: {
          baseUrl: tsConfig.compilerOptions.baseUrl,
          paths: tsConfig.compilerOptions.paths,
        },
      }),
    ],
  }
]

export default config
