import { useQuery } from '@tanstack/react-query'

import { api } from '@shared/api'

export const useQueryAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => api.userService.user.current(),
  })
}
