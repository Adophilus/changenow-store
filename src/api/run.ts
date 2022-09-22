import * as dotenv from 'dotenv'
import Server from './Server.js'

dotenv.config()

const server = new Server()
server.start(parseInt(process.env.BACKEND_SERVER_PORT))
