import { useQuery } from '@tanstack/react-query'
import { getAllTodo } from '.'

export const useGetAllTodo = () => {
  return useQuery({
    queryKey: ['allTodo'],
    queryFn: getAllTodo
  })
}
