export type userLevelStats = {
    level: number
    xp: number
    rank: number
} | undefined

export type userWarnStats = number

export type selfroleStats = {
    id: string,
    emoji: string,
    roleId: string,
    channelId: string,
    messageId: string
}