import type { Api } from '@shared/api'

import { HabitsStore } from '../HabitsStore'
import { NotesStore } from '../NotesStore'
import { TableViewStore } from '../TableViewStore'

class RootStore {
  public transportLayer: Api

  public tableViewStore: TableViewStore

  public habitStore: HabitsStore

  public notesStore: NotesStore

  constructor(transportLayer: Api) {
    this.transportLayer = transportLayer
    this.notesStore = new NotesStore(transportLayer)
    this.habitStore = new HabitsStore()
    this.tableViewStore = new TableViewStore()
  }
}

export { RootStore }
