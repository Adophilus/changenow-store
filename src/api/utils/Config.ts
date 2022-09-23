import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

interface IEnvVariables {
  [name: string]: string
}

const processEnv = (env: IEnvVariables | undefined): IEnvVariables | undefined => {
  if (env == null) {
    return env
  }

  const envVariableRegExp = /\$\{(.*?)\}/g
  for (const key of Object.keys(env)) {
    for (const match of env[key].matchAll(envVariableRegExp)) {
      if (env[match[1]] != null) {
        env[key] = env[key].replaceAll(`\${${match[1]}}`, env[match[1]])
      } else {
        env[key] = env[key].replaceAll(`\${${match[1]}}`, process.env[match[1]] ?? '')
      }
    }
  }
  return env
}

export const getEnv = (script?: string): IEnvVariables | undefined => {
  const CURRENT_SCRIPT = script ?? fileURLToPath(import.meta.url)
  console.log(CURRENT_SCRIPT)
  const CURRENT_SCRIPT_DIR = path.dirname(CURRENT_SCRIPT)
  const ENV_DIR = path.join(CURRENT_SCRIPT_DIR, '../../')
  return processEnv(dotenv.config({ path: path.join(ENV_DIR, '.env') }).parsed)
}
