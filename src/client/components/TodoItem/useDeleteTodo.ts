import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type DeleteTodoSchema, deleteTodo } from '@client/api/todos'

type SuccessResponse = Awaited<ReturnType<typeof deleteTodo>>
export const useDeleteTodo = () => {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation(
    async ({ id }: DeleteTodoSchema) => await deleteTodo({ id }),
    {
      onSuccess: async (data: SuccessResponse) => {
        // TODO: allTodoを定数から取得する
        await queryClient.invalidateQueries(['allTodo'])
        return data
      }
    }
  )
  return deleteMutation
}
