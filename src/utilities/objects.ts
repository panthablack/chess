import { filterOutNonIntegerValues, getMaxValue } from '@/utilities/arrays'

export const getNextFreeNumericalKey = (target: Object): number => {
  if (!Object.keys(target) || !Object.keys(target).length) return 1
  else return getMaxValue(filterOutNonIntegerValues(Object.keys(target)))
}
