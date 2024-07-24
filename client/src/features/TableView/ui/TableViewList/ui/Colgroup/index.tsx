import { observer } from 'mobx-react-lite'

type ColgroupProps<T> = {
  list: T[]
}

export const Colgroup = observer(<T extends { id: string }>({ list }: ColgroupProps<T>) => {
  return (
    <colgroup>
      <col key='name' width='5px' />
      {list.map(({ id }) => (
        <col key={id} width='1px' />
      ))}
      <col key='goal' width='2px' />
      <col key='done' width='3px' />
    </colgroup>
  )
})
