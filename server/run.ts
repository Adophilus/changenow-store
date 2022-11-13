import Server from './main'
import Config from '@/utils/Config'

const server = new Server()
server.start(parseInt(Config.server.port))
