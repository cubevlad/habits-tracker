import { format } from 'date-fns'
import { makeAutoObservable, runInAction } from 'mobx'

import type { Api } from '@shared/api'
import { createFlatList, getFirstAndLastDayOfMonth } from '@shared/lib'
import type { Note } from '@shared/types'

import { formatCreatedAt } from './lib'

export class NotesStore {
  private readonly transportLayer: Api

  flatNotesList: Record<string, Note[]> = {}

  notes: Note[] = []

  isLoading = true

  constructor(api: Api) {
    this.transportLayer = api

    makeAutoObservable(this)
  }

  getNotesById = (id: string) => this.flatNotesList[id]

  fetchNotes = async (date: Date) => {
    const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth(date)

    const formattedFirst = format(firstDayOfMonth, 'yyyy-MM-dd')
    const formattedLast = format(lastDayOfMonth, 'yyyy-MM-dd')

    const notes = await this.transportLayer.notesService.notes.getNotes({
      start_date: formattedFirst,
      end_date: formattedLast,
    })

    const flatNotesList = createFlatList({
      list: notes,
      byKey: 'createdAt',
      newListValuesType: 'arr',
      mapper: (item) => ({
        ...item,
        createdAt: formatCreatedAt(item.createdAt),
      }),
    })

    runInAction(() => {
      this.notes = notes
      this.isLoading = false
      this.flatNotesList = flatNotesList
    })
  }

  createNote = async (note: Pick<Note, 'content' | 'createdAt'>) => {
    const noteFromServer = await this.transportLayer.notesService.notes.createNote(note)
    const date = formatCreatedAt(noteFromServer.createdAt)

    runInAction(() => {
      this.notes = [noteFromServer, ...this.notes]

      const dateNotes = this.flatNotesList[date]
      if (!dateNotes) {
        this.flatNotesList[date] = [noteFromServer]
        return
      }

      this.flatNotesList[date] = [noteFromServer, ...this.flatNotesList[date]]
    })
  }

  updateNote = async (note: Pick<Note, 'content' | 'id'>) => {
    const noteFromServer = await this.transportLayer.notesService.notes.updateNote(note)
    const date = formatCreatedAt(noteFromServer.createdAt)

    runInAction(() => {
      this.notes = this.notes.map((item) => (item.id === note.id ? noteFromServer : item))
      this.flatNotesList[date] = this.flatNotesList[date].map((item) =>
        item.id === note.id ? noteFromServer : item
      )
    })
  }

  deleteNote = async (id: string, createdAt: Date | string) => {
    await this.transportLayer.notesService.notes.deleteNote(id)

    const date = formatCreatedAt(createdAt)

    runInAction(() => {
      this.notes = this.notes.filter((item) => item.id !== id)
      this.flatNotesList[date] = this.flatNotesList[date].filter((item) => item.id !== id)
    })
  }
}
