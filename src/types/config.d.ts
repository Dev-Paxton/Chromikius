export interface DatabaseSettings {
    host: string
    databaseName: string
    userName: string
    password: string
    required: boolean
}

export interface BotSettings {
    id: string
    token: string 
}

export interface GuildSettings {
    id: string
    surveyChannelId: string
    welcomeChannelId: string
    memberRoleId: string
}