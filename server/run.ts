import Server from './main'
import config from '@/utils/Config'

const server = new Server()
server.start(parseInt(config.server.port))
