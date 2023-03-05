import type { D1Database } from '@cloudflare/workers-types'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { z } from 'zod'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

if (import.meta.env.DEV) {
  app.use(
    '*',
    cors({
      origin: 'http://localhost:5173',
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true
    })
  )
  app.options('*', (c) => {
    return c.text('', 204)
  })
}

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
export const todoResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.string(),
  is_done: z.boolean()
})
export type TodoResponse = z.infer<typeof todoResponseSchema>

const route = app
  .post('/todos', zValidator('form', todoSchema), async (c) => {
    const task = c.req.valid('form')
    await c.env.DB.prepare('INSERT INTO todos(title, is_done) VALUES (?, ?);')
      .bind(task.title, task.isDone)
      .run()
    return c.jsonT(
      {
        ok: true,
        message: `${task.title} is created!`
      },
      201
    )
  })
  .get('/todos', async (c) => {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM todos;'
    ).all<TodoResponse>()
    return c.jsonT(
      {
        ok: true,
        todos: results || []
      },
      200
    )
  })

export type AppType = typeof route
export default app
