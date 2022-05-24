import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable, PermissionString } from "discord.js";
import { ExtendedClient } from "../structures/Client";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient
    interaction: ExtendedInteraction
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any

export type CommandType = {
    data: ChatInputApplicationCommandData
    userPermissions?: Array<PermissionString>
    botPermissions?: Array<PermissionResolvable>
    allowDm?: boolean
    execute: RunFunction
}