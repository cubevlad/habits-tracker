import { action, computed, makeObservable, observable } from 'mobx'

import { formatRu } from '@shared/lib'

export class TableViewStore {
  currentViewDate = new Date()

  initialViewDate = new Date()

  constructor() {
    makeObservable(this, {
      currentViewDate: observable,
      formattedDate: computed,

      handleDecrementMonth: action,
      handleIncrementMonth: action,
    })
  }

  get formattedDate() {
    return formatRu(new Date(this.currentViewDate), 'MMMM yyyy')
  }

  handleDecrementMonth = () => {
    const copy = new Date(this.currentViewDate)
    this.currentViewDate = new Date(copy.setMonth(copy.getMonth() - 1))
  }

  handleIncrementMonth = () => {
    const copy = new Date(this.currentViewDate)
    this.currentViewDate = new Date(copy.setMonth(copy.getMonth() + 1))
  }
}
