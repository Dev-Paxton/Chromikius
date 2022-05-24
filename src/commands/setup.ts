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
            .setDescription(`- Hauptmonitor: [AOC U2777PQU](https://amzn.to/3acq5WH)\n
                            - Zweitmonitor: [Acer Nitro XV242YP](https://amzn.to/3cir0rf)\n
                            - Maus: [Logitech MX Master 2S](https://amzn.to/39mKx85)\n
                            - [Apple Magic Trackpad 2](https://amzn.to/36mITS1)\n
                            - Tastatur: [Keychron K1 RGB Brown Switches](https://bit.ly/3aanCMt)\n
                            - Monitorhalterung: [ErGear](https://amzn.to/2YlpexB)\n
                            - Schreibtischlampe: [Tomons](https://amzn.to/36nB9zk)\n
                            - Monitorlampe: [BenQ ScreenBar Plus](https://amzn.to/2L0lePY)\n
                            - Mauspad: [Sidorenko XXL](https://amzn.to/39qzs67)\n
                            - [MacBook Pro 16 32GB RAM](https://amzn.to/3ahRuXw)\n
                            - Docking Station: [i-tec Thunderbolt 3](https://amzn.to/39rbwj6)\n
                            - Kamera: [Sony A6300](https://amzn.to/3pvt0jC)\n
                            - Objektiv: [Sigma 16mm f1.4](https://amzn.to/3pshPIF)\n
                            - Videolampe: [Godox SL-60W](https://amzn.to/39oQBgd)\n
                            - Elektronisches Notizbuch: [reMarkable 2](https://remarkable.com/store/remarkable-2)\n`)

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
})