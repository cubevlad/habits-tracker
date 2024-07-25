import { observer } from 'mobx-react-lite'

import { StyledCol } from './styled'

type ColgroupProps<T> = {
  list: T[]
}

export const Colgroup = observer(
  <T extends { id: string; isCurrent: boolean }>({ list }: ColgroupProps<T>) => {
    return (
      <colgroup>
        <col key='name' width='5px' />
        {list.map(({ id, isCurrent }) => {
          return <StyledCol key={id} $isCurrent={isCurrent} width='1px' />
        })}
        <col key='goal' width='2px' />
        <col key='done' width='3px' />
      </colgroup>
    )
  }
)
