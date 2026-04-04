export function formatDate2YMD(dateTimeString: number): string {
  const date = new Date(dateTimeString)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const formattedMonth = String(month).padStart(2, '0')
  const formattedDay = String(day).padStart(2, '0')

  return `${year}/${formattedMonth}/${formattedDay}`
}
