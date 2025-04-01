export function convertDateToTimestamp(date: string | undefined): number {
  if (!date) {
    return 0
  }

  const tzname = Intl.DateTimeFormat().resolvedOptions().timeZone
  const longOffsetFormatter = new Intl.DateTimeFormat('en-US', { timeZone: tzname, timeZoneName: 'longOffset' })
  const longOffsetString = longOffsetFormatter.format(new Date('1990-04-21T00:00:00.000'))
  const gmtOffset = longOffsetString.split('GMT')[1]

  const fullDateString = `${date}T00:00:00${gmtOffset}`
  return new Date(fullDateString).getTime()
}

export function convertTimestampToDate(timestamp: number): string {
  if (timestamp === 0) {
    return ''
  }

  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}
