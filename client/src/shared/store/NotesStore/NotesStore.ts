import { format } from 'date-fns'
import { makeAutoObservable, runInAction } from 'mobx'

import type { Api } from '@shared/api'
import { getFirstAndLastDayOfMonth } from '@shared/lib'
import type { Note } from '@shared/types'

export class NotesStore {
  private readonly transportLayer: Api

  notes: Note[] = []

  isLoading = true

  constructor(private readonly api: Api) {
    this.transportLayer = api

    makeAutoObservable(this)
  }

  fetchNotes = async (date: Date) => {
    const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth(date)

    const formattedFirst = format(firstDayOfMonth, 'yyyy-MM-dd')
    const formattedLast = format(lastDayOfMonth, 'yyyy-MM-dd')

    const notes = await this.transportLayer.notesService.notes.getNotes({
      start_date: formattedFirst,
      end_date: formattedLast,
    })

    runInAction(() => {
      this.notes = notes
      this.isLoading = false
    })
  }

  createNote = async (note: Pick<Note, 'content' | 'createdAt'>) => {
    const noteFromServer = await this.transportLayer.notesService.notes.createNote(note)

    runInAction(() => {
      this.notes = [noteFromServer, ...this.notes]
    })
  }

  updateNote = async (note: Pick<Note, 'content' | 'id'>) => {
    const noteFromServer = await this.transportLayer.notesService.notes.updateNote(note)

    runInAction(() => {
      this.notes = this.notes.map((item) => (item.id === note.id ? noteFromServer : item))
    })
  }

  deleteNote = async (id: string) => {
    await this.transportLayer.notesService.notes.deleteNote(id)

    runInAction(() => {
      this.notes = this.notes.filter((item) => item.id !== id)
    })
  }
}
