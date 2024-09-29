import { filterOutNonIntegerValues, getMaxValue } from '@/utilities/arrays'

export const getNumericalKeys = (target: Object): number[] =>
  Object.keys(target).map(k => parseInt(k))

export const getNextFreeNumericalKey = (target: Object): number => {
  if (!Object.keys(target) || !Object.keys(target).length) return 1
  else return getMaxValue(filterOutNonIntegerValues(getNumericalKeys(target))) + 1
}

export const parseIntMap = (
  target: Record<string | number, string | number>
): Record<number, number> => {
  const keys = Object.keys(target)
  return keys.reduce(
    (a: Record<number, number>, v: number | string) => {
      const intKey: number = parseInt(String(v))
      const intVal: number = parseInt(String(target[v]))
      a[intKey] = intVal
      return a
    },
    {} as Record<number, number>
  )
}

export const removeElementsInCommon = (
  objects: [Record<any, any>, Record<any, any>]
): [Record<any, any>, Record<any, any>] => {
  const [o1, o2] = objects
  const entries1 = Object.entries(o1)
  const entries2 = Object.entries(o2)
  if (!entries1.length || !entries2.length) return [o1, o2]
  const filtered1 = entries1.filter(e => o2[e[0]] !== e[1])
  const filtered2 = entries2.filter(e => o1[e[0]] !== e[1])
  const newObject1 = Object.fromEntries(filtered1)
  const newObject2 = Object.fromEntries(filtered2)
  return [newObject1, newObject2]
}

export const reverseObject = (target: Record<any, any>): Record<any, any> => {
  const entries = Object.entries(target)
  if (!entries.length) return {}
  else return Object.fromEntries(entries.map(e => [e[1], e[0]]))
}
