import { type DeleteTodoSchema } from '@/src/server/model'
import { useDeleteTodo } from './useDeleteTodo'
import { useGetAllTodo } from './useGetAllTodo'

export type Props = {}
export default function TodoList() {
  const { data, isError, error, isLoading, isFetching } = useGetAllTodo()
  const todos = data?.todos || []
  // console.warn({ data, isError, error, isLoading, isFetching })

  const deleteMutation = useDeleteTodo()
  const handleDelete = (id: DeleteTodoSchema['id']) => {
    deleteMutation.mutate({
      id
    })
  }
  const handleComplete = async (id) => {
    // const res = await client
  }
  const handleEdit = (id) => {
    return id
  }
  return (
    <>
      <ul className="divide-y divide-gray-200">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="grid grid-cols-4 place-content-center items-center justify-between py-4"
          >
            <button
              className="rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
              onClick={() => handleEdit(todo.id)}
            >
              Edit
            </button>
            <h3 className="text-lg font-medium">{todo.title}</h3>
            <input
              type="checkbox"
              checked={todo.is_done}
              className="mr-2 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-600"
              onChange={handleComplete(todo.id)}
            ></input>
            <button
              className="mr-2 rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-600"
              onClick={() => {
                handleDelete(todo.id)
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
