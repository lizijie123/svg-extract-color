process.env.__ENV__ = process.env.NODE_ENV
process.env.__PORT__ = '4000'

require('./index.ts')
