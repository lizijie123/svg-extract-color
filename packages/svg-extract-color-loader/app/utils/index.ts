import qs from 'querystring'
import type {
  IAnyObj,
} from '../../types/index'

/**
 * 获取配置的参数
 */
export function getOptions (query?: string | IAnyObj): IAnyObj {
  if (typeof query === 'string') {
    return (qs.parse(query.replace(/^\?/, '')) || {}) as IAnyObj
  }
  return query || {}
}
