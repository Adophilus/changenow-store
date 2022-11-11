import { getEnv } from './Env'
import path from 'path'

const { ENV, CURRENT_SCRIPT_DIR } = getEnv({ env: { dir: '../..' } })

export default {
  db: {
    url: ENV.DB_URL
  },
  server: {
    port: ENV.BACKEND_SERVER_PORT
  },
  project: {
    baseDir: path.join(CURRENT_SCRIPT_DIR, '..'),
    frontendIndex: path.join(CURRENT_SCRIPT_DIR, '..', 'build/frontend/index.html')
  },
  pocketbase: {
    url: ENV.POCKETBASE_URL,
    admin: {
      email: ENV.POCKETBASE_ADMIN_EMAIL,
      password: ENV.POCKETBASE_ADMIN_PASSWORD
    }
  }
}
