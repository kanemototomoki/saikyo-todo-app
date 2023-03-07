import type { D1Database } from '@cloudflare/workers-types'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { z } from 'zod'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(
  '*',
  cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true
  })
)

export const baseTodoSchema = z.object({
  id: z.string(),
  title: z.coerce
    .string()
    .trim()
    .min(1, {
      message: 'Task is required'
    })
    .max(10),
  isDone: z.string()
})
export type BaseTodoSchema = z.infer<typeof baseTodoSchema>

const todoResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.string(),
  is_done: z.string()
})
export type TodoResponseSchema = z.infer<typeof todoResponseSchema>

export type ParamTodoId = Pick<TodoResponseSchema, 'id'>

export const postTodoSchema = baseTodoSchema.pick({
  title: true
})
export type PostTodoSchema = z.infer<typeof postTodoSchema>

const updateTodoIsDoneSchema = baseTodoSchema.pick({
  isDone: true
})

const updateTodoContentSchema = baseTodoSchema.pick({
  title: true
})

const updateTodoSchema = z.union([
  updateTodoIsDoneSchema,
  updateTodoContentSchema
])

export type UpdateTodoIsDoneSchema = z.infer<typeof updateTodoIsDoneSchema>
export type UpdateTodoContentSchema = z.infer<typeof updateTodoContentSchema>
export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>

export type DeleteTodoSchema = ParamTodoId

const route = app
  .post('/todos', zValidator('form', postTodoSchema), async (c) => {
    const { title } = c.req.valid('form')

    const res = await c.env.DB.prepare('INSERT INTO todos (title) VALUES (?);')
      .bind(title)
      .run()

    return c.jsonT(
      {
        ok: true,
        id: res.meta.last_row_id as number
      },
      201
    )
  })
  .get('/todos', async (c) => {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM todos ORDER BY id asc;'
    ).all<TodoResponseSchema>()
    return c.jsonT(
      {
        ok: true,
        todos: results || []
      },
      200
    )
  })
  .put('/todos/:id', zValidator('json', updateTodoSchema), async (c) => {
    const todoId = c.req.param('id')
    const json = c.req.valid('json')
    let res = null
    if ('title' in json) {
      res = await c.env.DB.prepare('UPDATE todos SET title = ? WHERE id = ?;')
        .bind(json.title, todoId)
        .run()
    } else {
      res = await c.env.DB.prepare('UPDATE todos SET is_done = ? WHERE id = ?;')
        .bind(Number(json.isDone) ? 1 : 0, todoId)
        .run()
    }

    return c.jsonT({
      ok: true,
      id: res.meta.last_row_id as number
    })
  })
  .delete('/todos/:id', async (c) => {
    const todoId = c.req.param('id')
    const res = await c.env.DB.prepare('DELETE FROM todos WHERE id = ?;')
      .bind(todoId)
      .run()

    return c.jsonT({
      ok: true,
      id: res.meta.last_row_id as number
    })
  })

export type AppType = typeof route
export default app
