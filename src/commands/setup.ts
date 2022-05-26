import { MessageEmbed } from "discord.js"
import { Command } from "../structures/Command"

export default new Command({
    data: {
        name: "setup",
        description: "Kevin Chromiks Setup",
    },
    execute: async ({ interaction }) => {
        const embed = new MessageEmbed()
            .setColor("#ff9e00")
            .setTitle("Kevin Chromik's Setup")
            .setDescription(`- [Bürostuhl](https://bit.ly/3ae0i4c)
                            - [BenQ ScreenBar Halo](https://amzn.to/3lmdm9V)
                            - [BenQ PD3420Q](https://amzn.to/3abDTEE)
                            - [Apple Magic Trackpad 2](https://amzn.to/36mITS1)
                            - [Mikrofon](https://amzn.to/3wq50V0)
                            - [Mikrofonarm](https://amzn.to/3wIGiOS)
                            - [Hauptkamera](https://amzn.to/39AvHgF)
                            - [Lieblingsobjektiv](https://amzn.to/3lq1XWx)
                            - [Zweitkamera](https://amzn.to/3lrmbPY)
                            - [Elgato Stream Deck](https://amzn.to/3wDFkDb)
                            - [Elgato Cam Link](https://amzn.to/3G6NGYr)
                            - [Elgato Key Light](https://amzn.to/3lrzKi4)
                            - [Maus](https://amzn.to/38Dma8D)
                            - [Tastatur](https://bit.ly/3wrUw7L)
                            - [Laptop](https://amzn.to/3lq2Cr8)
                            - [GoXLR MINI](https://amzn.to/3lnieeP)
                            - [RGB Licht](https://amzn.to/3LnHZWZ)
                            - [Kamerahalterung](https://amzn.to/3MwFbIx)
                            - [Laptop Standfuß](https://amzn.to/3NnAP6x)
                            - [Apple Magic Trackpad 2](https://amzn.to/36mITS1)
                            - [Elektronisches Notizbuch: reMarkable 2](https://remarkable.com/store/remarkable-2)`)

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
})