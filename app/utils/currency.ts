const re = /(\d{1,3})(?=(\d{3})+$)/g

export function currency(val: number, symbol: string = 'NT$ '): string {
  if (!val)
    return '0'
  const arr = val.toString().split('.')
  return symbol + arr[0]!.replace(re, '$1,') + (arr.length === 2 ? `.${arr[1]}` : '')
}
