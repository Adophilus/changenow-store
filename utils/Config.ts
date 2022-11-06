import { getEnv } from './Env'

const { ENV } = getEnv({ env : { dir: '../..'}})

export default {
  db: {
    url: ENV.DB_URL
  },
  pocketbase: {
    url: ENV.POCKETBASE_URL,
    admin: {
      email: ENV.POCKETBASE_ADMIN_EMAIL,
      password: ENV.POCKETBASE_ADMIN_PASSWORD
    }
  }
}
