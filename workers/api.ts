import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { searchRoute } from './search';

const app = new Hono().basePath('/api')

app.use("*", cors({
  origin: ["http://localhost:3000", "https://speed-search-web-ndrainz.vercel.app"],
  allowMethods: ["GET"],
}))

app.get('/', (c) => {
  return c.json({
    message: 'Hello world!',
  })
})

app.route("/search", searchRoute)

// for cloudflare workers
export default app as never
