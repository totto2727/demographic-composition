import { loadEnvConfig } from '@next/env'

const setupEnv = () => {
  loadEnvConfig(process.env.PWD || process.cwd())
}

export default setupEnv
