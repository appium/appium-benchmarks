import { Command } from 'commander'
import run, { rerun, validateRunOpts } from './run'
import { ENV_TYPES } from './envs'
import compare from './compare'

const { version } = require('../package.json')
const program = new Command()

export type RunOptions = {
    env: string,
    scenario: string,
    report: string,
    save: string,
    caps: string
}

export type ValidatedRunOptions = {
    env: string,
    scenarioName: string,
    reportPath: string,
    scenarioSavePath: string | null,
    caps: {[key: string]: any}
}


async function main() {
    program
        .version(version)
        .command('run')
        .option('-e, --env <type>', `environment types (one of ${JSON.stringify(ENV_TYPES)})`, 'local')
        .option('-sn, --scenario <name>', 'scenario name for output', 'benchmark-scenario')
        .option('-r, --report <path>', 'file path to save report (in YAML format; defaults to <scenario-name>.yml in the current working directory)')
        .option('-ss, --save <path>', 'file path at which to save scenario spec (in YAML format; defaults to not saving scenario spec)')
        .option('-c, --caps <json_string>', 'extra capabilities used in session creation')
        .action(async function(this: Command) {
            const validatedOpts = validateRunOpts(this.opts())
            await run(validatedOpts)
        })

    program
        .command('rerun')
        .argument('<scenario_spec_path>', 'path to the saved scenario spec .yml')
        .action(rerun)

    program
        .command('compare')
        .argument('<report_files...>', 'set of scenario run reports to compare')
        .action(compare)

    await program.parseAsync(process.argv)

}

if (require.main === module) {
    main().catch((err) => {
        console.error(err)
        process.exit(1)
    })
}
