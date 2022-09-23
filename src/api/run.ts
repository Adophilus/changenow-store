import { fileURLToPath } from 'url'
import Server from './Server.js'
import { getEnv } from '../utils/Env.js'

const { ENV } = getEnv(fileURLToPath(import.meta.url), '../../')

const server = new Server()
server.start(parseInt(ENV.BACKEND_SERVER_PORT))
