export const filterOutNonIntegerValues = (a: any[]) => a.filter(v => Number.isInteger(v))

export const filterOutNonNumericalValues = (a: any[]) =>
  a.filter(v => {
    if (v === 0) return true
    else if (!v) return false
    else if (Number.isNaN(v)) return false
    else if (typeof v === 'number') return true
  })

export const getMaxValue = (a: number[]): number => Math.max(...a)

export const pushIfExists = (array: any[], object: Record<any, any>, key: any): any[] => {
  const resolved: any = object[key]
  if (resolved !== undefined && resolved !== null) array.push(resolved)
  return array
}

export const removeIfMatched = (needle: any, haystack: any[]): any => {
  const location = haystack.findIndex(v => v === needle)
  if (location !== -1) return haystack.splice(location, 1)[0]
}
