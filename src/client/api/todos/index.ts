import { hc } from 'hono/client'
import type {
  AppType,
  TodoResponse,
  PostTodoSchema,
  DeleteTodoSchema
} from '@server/model'

const url = import.meta.env.DEV ? 'http://localhost:8788/api' : 'api'
const client = hc<AppType>(url)

/**
 * @desc Todo追加
 */
export async function addTodo({ title }: PostTodoSchema): Promise<{
  ok: boolean
  id: number
}> {
  const res = await client.todos.$post({
    form: {
      title
    }
  })

  return await res.json()
}

/**
 * @desc Todo全件取得
 */
export async function getAllTodo(): Promise<{
  ok: boolean
  todos: TodoResponse[]
}> {
  const res = await client.todos.$get()
  // https://github.com/honojs/hono/issues/950
  return (await res.json()) as unknown as {
    ok: boolean
    todos: TodoResponse[]
  }
}

/**
 * @desc Todo削除
 */
export async function deleteTodo({ id }: DeleteTodoSchema): Promise<{
  ok: boolean
  id: number
}> {
  const res = await client.todos[':id'].$delete({
    param: {
      id: id.toString()
    }
  })
  return await res.json()
}