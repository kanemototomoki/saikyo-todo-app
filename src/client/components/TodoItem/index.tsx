import type {
  TodoResponseSchema,
  DeleteTodoSchema,
  UpdateTodoIsDoneSchema, // UpdateTodoContentSchema,
  ParamTodoId
} from '@server/model'
import { cn } from '@client/lib/utils'
import { useDeleteTodo } from './useDeleteTodo'
import { useUpdateTodo } from './useUpdateTodo'

export type Props = {
  todo: TodoResponseSchema
  orderId: number | undefined
}
export default function TodoItem({ todo, orderId }: Props) {
  const deleteMutation = useDeleteTodo()
  const updateMutation = useUpdateTodo()
  const handleDelete = ({ id }: DeleteTodoSchema) => {
    deleteMutation.mutate({
      id
    })
  }
  const handleIsDone = ({
    id,
    isDone
  }: ParamTodoId & UpdateTodoIsDoneSchema) => {
    updateMutation.mutate({
      id,
      isDone
    })
  }
  // const handleEdit = ({ id, title }: ParamTodoId & UpdateTodoContentSchema) => {
  //   updateMutation.mutate({
  //     id,
  //     title
  //   })
  // }
  return (
    <>
      {/* <button
        className="rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
        onClick={() => {
          handleEdit({ id: todo.id, title: 'sample' })
        }}
      >
        Edit
      </button> */}
      <p className={cn('text-3xl font-bold')}># {orderId}</p>
      <h3
        className={cn(
          'first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:text-slate-900 first-line:uppercase first-line:tracking-widest'
        )}
      >
        {todo.title}
      </h3>
      <input
        type="checkbox"
        checked={Boolean(todo.is_done)}
        className="mr-2 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-600"
        onChange={() => {
          handleIsDone({
            id: todo.id,
            isDone: Number(!todo.is_done).toString()
          })
        }}
      ></input>
      <button
        className="mr-2 rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-600"
        onClick={() => {
          handleDelete({ id: todo.id })
        }}
      >
        Delete
      </button>
    </>
  )
}
