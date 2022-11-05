import Server from './main'
import * as dotenv from 'dotenv'

dotenv.config()

const server = new Server()
server.start(parseInt(process.env.BACKEND_SERVER_PORT))
