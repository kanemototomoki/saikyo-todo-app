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

export const todoSchema = z.object({
  title: z.coerce
    .string()
    .trim()
    .min(1, {
      message: 'Task is required'
    })
    .max(50),
  isDone: z.string()
})

export type Schema = z.infer<typeof todoSchema>
const todoResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.string(),
  is_done: z.boolean()
})
export type TodoResponse = z.infer<typeof todoResponseSchema>

export const postTodoSchema = todoSchema.pick({
  title: true
})
export type PostTodoSchema = z.infer<typeof postTodoSchema>
const updateTodoSchema = todoSchema
  .pick({
    isDone: true
  })
  .or(
    todoSchema.pick({
      title: true
    })
  )

const deleteTodoSchema = z.object({
  id: z.number()
})

export type DeleteTodoSchema = z.infer<typeof deleteTodoSchema>

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
    ).all<TodoResponse>()
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
    console.warn('put', json)
    // await c.env.DB.prepare('UPDATE todos SET is_done = ? WHERE id = ?;')
    //   .bind(isDone ? 1 : 0, todoId)
    //   .run()

    return c.jsonT({
      ok: true,
      message: `${todoId} is updated`
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
