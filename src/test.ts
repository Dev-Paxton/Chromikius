import { createCanvas, loadImage, registerFont } from "canvas"
import fs, { stat } from "fs"
import fetch from "node-fetch"

const avatarURL = "https://cdn.discordapp.com/avatars/282643568332636161/b7f1b4b641de23cfebb357198a626b98.jpeg";
const stats = {
    level: 10,
    rank: 1,
    xp: 91
} as any

(async () => {
    

    registerFont("./assets/fonts/RobotoMono-VariableFont_wght.ttf", { family: "Roboto Mono" })
    const canvas = createCanvas(900, 300)
    const ctx = canvas.getContext("2d")

    ctx.font = "50px Roboto Mono"

    // ctx.drawImage(await loadImage(`${__dirname}/../../assets/images/background${Math.floor(Math.random() * 5) +1}.png`), 0, 0)
    ctx.drawImage(await loadImage(`./assets/images/background${Math.floor(Math.random() * 5) +1}.png`), 0, 0)

    ctx.fillRect(40, 40, 220, 220)

    // ctx.drawImage(await loadImage(member.displayAvatarURL({ extension: "jpeg"})), 50, 50, 200, 200)
    ctx.drawImage(await loadImage(avatarURL), 50, 50, 200, 200)

    ctx.fillStyle = "#ffffff"

    const labelTextHeight = 40 + ctx.measureText("Level:Rank:xp:").actualBoundingBoxAscent + ctx.measureText("Level:Rank:xp:").actualBoundingBoxDescent
    const textHeight = labelTextHeight + 20 + ctx.measureText("100100100").actualBoundingBoxAscent + ctx.measureText("100100100").actualBoundingBoxDescent

    ctx.fillText("Level:", 300, labelTextHeight)
    ctx.fillText(stats.level, 300, textHeight)

    ctx.fillText("Rank:", 500, labelTextHeight)
    ctx.fillText(stats.rank, 500, textHeight)

    ctx.fillText("xp:", 700, labelTextHeight)
    ctx.fillText(stats.xp, 700, textHeight)

    

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

    ctx.fillText("|", 300, 240)
    const lineWidth = ctx.measureText("|").width

    ctx.font = "40px Roboto Mono"
    const progressBarTextWidth = ctx.measureText(progressBar).width
    ctx.fillText(progressBar, 300 + lineWidth, 240)

    ctx.font = "50px Roboto Mono"
    ctx.fillText("|", 300 + lineWidth + progressBarTextWidth, 240)
    
    

    const out = fs.createWriteStream(__dirname + "/img.png")
    canvas.createPNGStream().pipe(out)

    out.on("finish", () => {
        console.log("Finished")
    })
})()