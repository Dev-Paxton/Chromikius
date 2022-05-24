import fs from "fs"

export function commandExists(inputCmd) {
    var rawdata = fs.readFileSync(`${__dirname}/../commands.json`).toString()
    var commands = JSON.parse(rawdata)

    for (const cmdGroup in commands) {
        for (var cmd in commands[cmdGroup]) {
            cmd = cmd.split(" ")[0]
            if (cmd === inputCmd) return true
        }
    }

    return false
}