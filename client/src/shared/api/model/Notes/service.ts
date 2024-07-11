import type { AxiosInstance } from 'axios'

import { NotesController } from './controller'

export class NotesService {
  notes: NotesController

  constructor(private readonly apiInstance: AxiosInstance) {
    this.notes = new NotesController(this.apiInstance)
  }
}
