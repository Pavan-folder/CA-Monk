import { useQuery } from '@tanstack/react-query'

import { getBlog } from '@/api/blogs'

export const useBlog = (id: string | undefined) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id!),
    enabled: !!id,
  })
}
