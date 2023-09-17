import { User } from "discord.js"


export async function getUserAvatar(member: User) {
    return new Promise(async resolve => {
        if (member.avatarURL() === null) {
            resolve("./images/discord_logo.jpg")
        }  else {
            const response = await fetch(member.avatarURL())
            const buffer = await response.arrayBuffer()
            resolve(buffer)
        }
    })
}