/**
 * 任意类型对象
 */
export interface IAnyObj<T = string> {
  [props: string]: T,
}
