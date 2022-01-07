import { Guild, GuildMember, MessageEmbed, User } from "discord.js"
import sharp from "sharp"
import { db } from "../../main"
import { Command } from "../structures/Command"
import { userLevelStats } from "../types/userStats"
import fetch from "node-fetch"
import fs from "fs"

async function getSvgBuffer(text: string | number, x:number, y:number) {
    y += 35
    const svg = `
    <svg width="900" height="300">
        <style>
            @import url('https://fonts.googleapis.com/css2?amp;family=Roboto+Mono&amp;display=swap');
            .text {
                fill: #ffff;
                font-size: 50px;
                font-family: 'Roboto Mono', monospace;
                font-weight: bold;
            }
        </style>
        <text x="${x}" y="${y}" class="text">${text}</text>
    </svg>`

    const svgBuffer = Buffer.from(svg)
    return svgBuffer
}

export default new Command({
    name: "rank",
    description: "Zeigt dein Level an",
    options: [
        {
            type: 6,
            name: "member",
            description: "Member dessen Level angezeigt werden soll"
        }
    ],
    execute: async({ interaction }) => {
        var interactionMember = interaction.options.get("member")

        if (interactionMember) {
            var member = interactionMember.user
        } else {
            member = interaction.user
        }

        if (member.bot) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Bots können nicht leveln")
            
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        const owner: Array<string> = ["578087448341643267", "573598260229439503"]
        if (owner.includes(member.id)) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Die Owner können nicht leveln")
        
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        db.levelsystem_get_stats(member.id, async (stats: userLevelStats) => {
            if (stats === undefined) {
                const embed = new MessageEmbed()
                    .setColor("#fc030b")
                    .setTitle("Dieser User hat noch keine Nachricht verfasst")
                await interaction.reply({ embeds: [embed], ephemeral: true })
                return
            }

            const fileNameAvatar = member.id + "Avatar.png"
            const fileNameCard = member.id + "Card.png"

            const response = await fetch(member.avatarURL())
            const buffer = await response.buffer()

            sharp(buffer)
            .resize({ width: 200, height: 200 })
            .extend({top: 10, right: 10, bottom: 10, left: 10, background: "black"})
            .png()
            .toFile(fileNameAvatar, async (error) => {
                if (error) throw error

                if (stats.xp === 0) {
                    var progressBar = "--------------------"
                } else if (stats.xp === 1) {
                    var progressBar = "[][][][][][][][][][]----------"
                } else if (stats.level != 1) {
                    const levelUp = stats.level * stats.level
                    const currentLevelUp = (stats.level - 1) * (stats.level - 1)
                    const requiredXpInPercent = 100 / (levelUp - currentLevelUp) * (stats.xp - currentLevelUp)
                    const requiredSymbols = requiredXpInPercent / 10

                    var progressBar = ""
                    var a = 1
                    while (a <= requiredSymbols) {
                        if (progressBar === undefined) {
                            progressBar = "[]"
                        } else {
                            progressBar += "[]"
                        }
                        a += 1
                    }

                    while (progressBar.length < 20) {
                        progressBar += "--"
                    }
                }

                sharp(`images/background${Math.floor(Math.random() * 5) + 1}.png`)
                .composite([
                    {
                        input: fileNameAvatar,
                        top: 40,
                        left: 40,
                    },
                    {
                        input: await getSvgBuffer("Level:", 300, 40),
                        top: 0,
                        left: 0
                    },
                    {
                        input: await getSvgBuffer(stats.level, 300, 100),
                        top: 0,
                        left: 0
                    },
                    {
                        input: await getSvgBuffer("Rank:", 500, 40),
                        top: 0,
                        left: 0
                    },
                    {
                        input: await getSvgBuffer(stats.rank, 500, 100),
                        top: 0,
                        left: 0
                    },
                    {
                        input: await getSvgBuffer("xp:", 700, 40),
                        top: 0,
                        left: 0
                    },
                    {
                        input: await getSvgBuffer(stats.xp, 700, 100),
                        top: 0,
                        left: 0
                    },
                    {
                        input: await getSvgBuffer("|" + progressBar + "|", 300, 200),
                        top: 0,
                        left: 0
                    }
                ])
                .png()
                .toFile(fileNameCard, async (error) => {
                    if (error) throw error
                    
                    await interaction.reply({ files: [fileNameCard]})
                    
                    fs.unlink(fileNameAvatar, (error) => {
                        if (error) throw error
                    })
                
                    fs.unlink(fileNameCard, (error) => {
                        if (error) throw error
                    })
                })
            })
        })
    }
})