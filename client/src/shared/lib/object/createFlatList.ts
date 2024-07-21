import { isPrimitive } from '../helpers'

type CreateFlatListProps<
  T extends Record<string, any>,
  U extends keyof T,
  V extends 'arr' | 'obj',
> = {
  list: T[]
  byKey?: U
  newListValuesType?: V
  mapper?: (item: T) => T
}

/**
 * Create flat list from array of objects
 * @param list array of objects
 * @param byKey key to group by, default is 'id'
 * @param newListValuesType type of values in flatList, either 'arr' or 'obj'
 * @default newListValuesType = 'obj'
 */
export const createFlatList = <
  T extends Record<string, any>,
  U extends keyof T,
  V extends 'arr' | 'obj',
>({
  list,
  mapper,
  byKey = 'id' as U,
  newListValuesType = 'obj' as V,
}: CreateFlatListProps<T, U, V>) => {
  if (!isPrimitive(byKey)) {
    throw new Error('byKey must be a string, number, or symbol')
  }

  const flatList: any = {}

  list.forEach((item) => {
    const key = mapper ? mapper(item)[byKey] : String(item[byKey])

    if (!isPrimitive(key)) {
      throw new Error('value of list[byKey] must be a string, number, or symbol')
    }

    if (newListValuesType === 'arr') {
      if (!flatList[key]) {
        flatList[key] = []
      }
      flatList[key].push(item)
    } else {
      flatList[key] = item
    }
  })

  return flatList as V extends 'arr' ? Record<string, T[]> : Record<string, T>
}
