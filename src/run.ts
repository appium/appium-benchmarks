import { RunOptions, ValidatedRunOptions } from '.'
import { ENV_TYPES, ENVS } from './envs'
import YAML from 'yaml'
import log from './log'
import util from 'util'
import path from 'path'

const { stderr } = log

export default async function run(opts: ValidatedRunOptions) {
}

export async function rerun(specPath: string) {
}

export class RunOptionsValidationError extends Error {}

export function validateRunOpts(opts: RunOptions): ValidatedRunOptions {
    if (!ENV_TYPES.includes(opts.env)) {
       throw new RunOptionsValidationError(`'${opts.env}' is not a recognized environment. Please choose from this list: ${JSON.stringify(ENV_TYPES)}`)
    }
    const scenarioName = opts.scenario
        .replaceAll(/[^A-Za-z0-9-_\.]/g, '-')
        .toLowerCase()
    const reportPath = opts.report ?? path.resolve(process.cwd(), `${scenarioName}.yml`)
    const scenarioSavePath = opts.save ?? null
    let caps = {}
    if (opts.caps) {
        try {
            caps = JSON.parse(opts.caps)
        } catch (err) {
            throw new RunOptionsValidationError(
                `The included extra capabilities (${opts.caps}) could not be parsed ` +
                `into valid JSON. Please check the format and try again. Original ` +
                `error: ${err}`)
        }
    }

    const validatedOpts = {
        env: opts.env,
        scenarioName,
        reportPath,
        scenarioSavePath,
        caps
    }

    stderr.check('Validated benchmark run options')
    stderr.info(JSON.stringify(validatedOpts, undefined, 2))


    if (scenarioSavePath) {
    }

    return validatedOpts
}
