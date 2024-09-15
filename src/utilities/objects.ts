import { filterOutNonIntegerValues, getMaxValue } from '@/utilities/arrays'

export const getNumericalKeys = (target: Object): number[] =>
  Object.keys(target).map(k => parseInt(k))

export const getNextFreeNumericalKey = (target: Object): number => {
  if (!Object.keys(target) || !Object.keys(target).length) return 1
  else return getMaxValue(filterOutNonIntegerValues(getNumericalKeys(target))) + 1
}
