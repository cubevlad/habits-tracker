import { formatRu } from '@shared/lib'

export const formatCreatedAt = (date: Date | string) =>
  formatRu(new Date(date), 'd MMMM yyyy', false)
