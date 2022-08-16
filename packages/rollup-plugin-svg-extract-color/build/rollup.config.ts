import { RollupOptions } from 'rollup'
import rollupPluginSvgExtractColor from '../app/index'

const config = {
  input: 'app/test.js',
  output: [
    // {
    //   dir: 'dist',
    //   format: 'cjs',
    //   sourcemap: process.env.NODE_ENV === 'development',
    // },
    {
      dir: 'es',
      format: 'esm',
      sourcemap: process.env.NODE_ENV === 'development',
    }
  ],
  plugins: [
    rollupPluginSvgExtractColor({
      // 输出目录
      outputDir: 'static/svg',
    }),
  ],
}

export default config
