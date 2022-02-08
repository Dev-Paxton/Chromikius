import Database from "./Database"

export default class CommandStatus {
    static disabledCommands: Array<string> = []

    static async loadDisabledCommands() {
        const disabledCommands = await Database.getDisabledCommands()
        console.log(disabledCommands)

        if (disabledCommands != undefined) {
            this.disabledCommands = disabledCommands
        }
    }

    static addToCache(commandName: string) {
        this.disabledCommands.push(commandName)
    }

    static removeFromCache(commandName: string) {
        this.disabledCommands = this.disabledCommands.filter(e => e != commandName)
    }
}