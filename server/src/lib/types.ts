export type Option<T> = T | object

export type Pretify<T> = {
  [P in keyof T]: T[P]
} & object
