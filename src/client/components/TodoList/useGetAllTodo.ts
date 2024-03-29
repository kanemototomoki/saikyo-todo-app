import { getAllTodo } from '@client/api/todos'
import { useQuery } from '@tanstack/react-query'

export const useGetAllTodo = () => {
  return useQuery({
    queryKey: ['allTodo'],
    queryFn: getAllTodo
  })
}
