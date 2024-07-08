import { HabitsStore } from '../HabitsStore'
import { TableViewStore } from '../TableViewStore'

class RootStore {
  public tableViewStore: TableViewStore

  public habitStore: HabitsStore

  constructor() {
    this.tableViewStore = new TableViewStore()
    this.habitStore = new HabitsStore()
  }
}

const rootStore = new RootStore()

export { rootStore }
