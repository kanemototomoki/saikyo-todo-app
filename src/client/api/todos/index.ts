import { hc } from 'hono/client'
import type {
  AppType,
  TodoResponseSchema,
  PostTodoSchema,
  DeleteTodoSchema,
  UpdateTodoSchema,
  ParamTodoId
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
  todos: TodoResponseSchema[]
}> {
  const res = await client.todos.$get()
  // https://github.com/honojs/hono/issues/950
  return (await res.json()) as unknown as {
    ok: boolean
    todos: TodoResponseSchema[]
  }
}

/**
 * @desc Todo取得
 */
export async function getCursorTodo({ cursor }: { cursor: number }): Promise<{
  ok: boolean
  todos: TodoResponseSchema[]
  next: string | null
  prev: string | null
}> {
  const res = await client.todos.$get({
    query: {
      cursor
    }
  })
  // https://github.com/honojs/hono/issues/950
  return (await res.json()) as unknown as {
    ok: boolean
    todos: TodoResponseSchema[]
    next: string | null
    prev: string | null
  }
}

/**
 * @desc Todo更新
 */
export async function updateTodo({
  id,
  ...other
}: ParamTodoId & UpdateTodoSchema) {
  const res = await client.todos[':id'].$put({
    param: {
      id: id.toString()
    },
    json: {
      ...other
    }
  })

  return await res.json()
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
