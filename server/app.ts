import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expenseRoute } from './routes/expenses'
import { serveStatic } from 'hono/bun'
import { authRoute } from './routes/auth'

const app = new Hono()

app.use('*', logger())


const apiRoutes = app.basePath('/api')
  .route('/expenses', expenseRoute)
  .route('/', authRoute)


app.get('*', serveStatic({ root: './simplefront/dist' }))
app.get('*', serveStatic({ path: './simplefront/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes