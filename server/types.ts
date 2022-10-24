import PocketBase from 'pocketbase'
import { Logger } from 'tslog'

export type ControllerConstructorProps = {
  pocketBase: PocketBase
  logger: Logger
}
