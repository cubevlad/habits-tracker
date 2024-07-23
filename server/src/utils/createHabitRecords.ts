export const formatDate = (date: Date) => date.toISOString().split('T')[0]

const getDaysInCurrentMonth = (startedAt: Date) => {
  const date = new Date(startedAt);
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayNextMonth = new Date(year, month + 1, 1);
  // @ts-expect-error
  const lastDayCurrentMonth = new Date(firstDayNextMonth - 1);

  return lastDayCurrentMonth.getDate();
}

export const createHabitRecords = (startedAt: Date) => {
  const daysInCurrentMonth = getDaysInCurrentMonth(startedAt);

  const records = [];

  for (let i = 0; i < daysInCurrentMonth; i++) {
    const date = new Date(startedAt);
    date.setDate(i + 1);

    records.push({
      date,
      done: false,
    });
  }

  return records;
}