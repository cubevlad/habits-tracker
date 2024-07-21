import { Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'

import type { TableViewItem } from '@shared/types'

import { StyledCardsViewWrapper } from './CardsViewList.styled'
import { Card } from './ui'

type CardsViewListProps = {
  list: TableViewItem[]
}

export const CardsViewList: React.FC<CardsViewListProps> = observer(({ list }) => {
  return (
    <Stack alignItems='center' flex='1 1 auto'>
      <StyledCardsViewWrapper>
        {list.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </StyledCardsViewWrapper>
    </Stack>
  )
})
