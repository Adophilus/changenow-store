import { getEnv } from './Env'
import path from 'path'

const { ENV, CURRENT_SCRIPT_DIR } = getEnv({ env: { dir: '../..' } })

const Config = {
  db: {
    url: ENV.DB_URL
  },
  server: {
    port: ENV.BACKEND_SERVER_PORT
  },
  project: {
    rootDir: path.join(CURRENT_SCRIPT_DIR, '..'),
    baseUrl: ENV.BASE_URL,
    frontendDir: path.join(CURRENT_SCRIPT_DIR, '../frontend')
  },
  pocketbase: {
    url: ENV.POCKETBASE_URL,
    admin: {
      email: ENV.POCKETBASE_ADMIN_EMAIL,
      password: ENV.POCKETBASE_ADMIN_PASSWORD
    },
    tablePrefix: ENV.POCKETBASE_TABLE_PREFIX
  }
}
export default Config
