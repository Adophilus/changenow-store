import {Logger} from 'tslog'
import PocketBase from 'pocketbase'

export type ControllerConstructorProps = {
  pocketBase: PocketBase
  logger: Logger
}
