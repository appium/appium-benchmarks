import colors from '@colors/colors/safe'

type Logger = (msg: string) => void
type LoggerMap = {[key: string]: Logger}
type ValidColor = 'grey' | 'black' | 'yellow' | 'red' | 'green'

const colorMap: {[key: string]: [ValidColor | null, string | null]} = {
    info: ['grey', null],
    notice: [null, null],
    check: ['grey', '✓'],
    warn: ['yellow', '⚠'],
    err: ['red', '✗'],
    bullet: [null, '·'],
}

type Levels = keyof typeof colorMap
type LevelMap = {[key in keyof Levels]?: Logger}

const stdout: LevelMap = {}
const stderr: LevelMap = {}
for (const level of Object.keys(colorMap)) {
    const [color, prefix] = colorMap[level]
    stdout[level as keyof Levels] = buildLogger(color, console.log.bind(console), prefix)
    stderr[level as keyof Levels] = buildLogger(color, console.error.bind(console), prefix)
}

let log: {stdout: LoggerMap, stderr: LoggerMap} = {
    stdout,
    stderr
}

function buildLogger(color: ValidColor | null, logger: Logger, prefix: string | null): Logger {
    return (msg: string) => {
        const colorizer = color ? colors[color] : (msg: string) => msg
        const prefixStr = prefix ? `${prefix} ` : ''
        logger(colorizer(`${prefixStr}${msg}`))
    }
}

export default log
