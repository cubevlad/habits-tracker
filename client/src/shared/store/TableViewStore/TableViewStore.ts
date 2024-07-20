import { action, computed, makeObservable, observable } from 'mobx'

import { formatRu } from '@shared/lib'

export class TableViewStore {
  currentViewDate = new Date()

  initialViewData = new Date()

  constructor() {
    makeObservable(this, {
      currentViewDate: observable,
      formattedDate: computed,

      handleDecrement: action,
      handleIncrement: action,
    })
  }

  get formattedDate() {
    return formatRu(new Date(this.currentViewDate), 'MMMM yyyy')
  }

  handleDecrement = () => {
    const copy = new Date(this.currentViewDate)
    this.currentViewDate = new Date(copy.setMonth(copy.getMonth() - 1))
  }

  handleIncrement = () => {
    const copy = new Date(this.currentViewDate)
    this.currentViewDate = new Date(copy.setMonth(copy.getMonth() + 1))
  }
}
