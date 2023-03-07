import TodoItem from '@client/components/TodoItem'
import { useGetAllTodo } from './useGetAllTodo'

export type Props = {}
export default function TodoList() {
  const { data, isError, error, isLoading, isFetching } = useGetAllTodo()
  const todos = data?.todos || []

  return (
    <>
      <ul className="divide-y divide-gray-200">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="grid grid-cols-4 place-content-center items-center justify-between py-4"
          >
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </>
  )
}
