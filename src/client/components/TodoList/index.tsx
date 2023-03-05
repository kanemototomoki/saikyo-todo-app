import { useGetAllTodo } from '@client/api/Todo/useGetAllTodo'

export type Props = {}
export default function TodoList() {
  const { data, isError, error, isLoading, isFetching } = useGetAllTodo()
  const todos = data?.todos || []
  console.warn({ data, isError, error, isLoading, isFetching })
  return (
    <>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.is_done}</p>
          </div>
        )
      })}
    </>
  )
}
