import { CommandType } from "../types/commandType";

export class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions)
    }
}