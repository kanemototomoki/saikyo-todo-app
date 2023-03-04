import type { AppType } from '@functions/api/[[route]]'
import { hc } from 'hono/client'

const client = hc<AppType>('')

const res = await client.todos.$post({
  form: {
    title: 'aaa',
    dueDate: String(new Date()),
    isDone: String(false)
  }
})

console.warn({ res })
