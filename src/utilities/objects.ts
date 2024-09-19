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

export const reverseObject = (
  target: Record<string | number, string | number>
): Record<string | number, string | number> => {
  const entries = Object.entries(target)
  if (!entries.length) return {}
  else return Object.fromEntries(entries.map(e => [e[1], e[0]]))
}
