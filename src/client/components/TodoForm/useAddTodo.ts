import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type PostTodoSchema } from '@server/model'
import { addTodo } from '@client/api/todos'

type SuccessResponse = Awaited<ReturnType<typeof addTodo>>
export const useAddTodo = () => {
  const queryClient = useQueryClient()
  const addMutation = useMutation(
    async ({ title }: PostTodoSchema) => await addTodo({ title }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['allTodo'] })
      },
      onSuccess: (data: SuccessResponse) => {
        // TODO: allTodoを定数から取得する
        return data
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(['allTodo'])
      }
    }
  )
  return addMutation
}
