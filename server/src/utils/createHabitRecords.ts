export const formatDate = (date: Date) => date.toISOString().split('T')[0]

export const getDaysInCurrentMonth = (startedAt: Date) => {
  const date = new Date(startedAt)
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDayNextMonth = new Date(year, month + 1, 1)
  // @ts-expect-error
  const lastDayCurrentMonth = new Date(firstDayNextMonth - 1)

  return lastDayCurrentMonth.getDate()
}

export const createHabitRecords = (startedAt: Date) => {
  const currentYear = new Date(startedAt).getFullYear()
  const tempDate = new Date(startedAt)

  const records = []

  while (tempDate.getFullYear() === currentYear) {
    const daysInCurrentMonth = getDaysInCurrentMonth(tempDate)

    for (let i = 0; i < daysInCurrentMonth; i++) {
      const date = new Date(tempDate)
      date.setDate(i + 1)

      records.push({
        date: date,
        done: false,
      })
    }

    tempDate.setMonth(tempDate.getMonth() + 1)
  }

  return records
}
