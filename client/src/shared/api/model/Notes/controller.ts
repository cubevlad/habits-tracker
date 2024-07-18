import type { AxiosInstance } from 'axios'

import type { Note } from '@shared/types'

export class NotesController {
  private readonly instance: AxiosInstance

  constructor(private readonly apiInstance: AxiosInstance) {
    this.instance = apiInstance
  }

  public getNotes = async ({
    start_date,
    end_date,
  }: {
    start_date: Date | string
    end_date: Date | string
  }) => {
    const { data } = await this.instance.get<Note[]>('notes', { params: { start_date, end_date } })

    return data
  }

  public createNote = async (note: Pick<Note, 'content' | 'createdAt'>) => {
    const { data } = await this.instance.post<Note>('notes/create', note)

    return data
  }

  public updateNote = async (note: Pick<Note, 'content' | 'id'>) => {
    const { data } = await this.instance.put<Note>('notes/update', note)

    return data
  }

  public deleteNote = async (id: string) => {
    await this.instance.delete(`notes/${id}`)
  }
}
