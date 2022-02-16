import BaseEnv from './base'
import LocalEnv from './local'

export const ENVS: {[key: string]: typeof BaseEnv} = {
    local: LocalEnv,
}

export const ENV_TYPES = Object.keys(ENVS)
export {
    BaseEnv
}
