export const isPrimitive = (value: any): value is number | string | symbol => {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol'
}
