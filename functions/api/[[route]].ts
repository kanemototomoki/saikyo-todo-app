import { handle } from 'hono/cloudflare-pages'
import app from '@server/model'

export const onRequest = handle(app, '/api')
