import mysql, { Connection } from "mysql"
import dotenv from "dotenv"
import { Message } from "discord.js"

dotenv.config()

if (process.env.enviroment === "dev") {
    var database = "test_chromik"
  } else {
    var database = "chromik"
  }

export class Database {
    private db: Connection;

    constructor(){
        this.db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: process.env.DATABASE_PSWD,
            database: database
        })

        this.db.connect()
    }

    async levelsystem_get_stats(member_id: string, callback) {
        this.db.query(`SELECT * FROM levelsystem ORDER BY xp DESC`, (error, results, fields) => {
            if (error) throw error
            
            var rank: number = 1

            for (const user of results) {
                if (user.id === member_id) {
                    const level: number = user.level
                    const xp: number = user.xp
                    return callback({ level, xp, rank })
                }

                rank += 1
            }
        })
    }

    levelsystem_register(member_id: string) {
        this.db.query(`SELECT * FROM levelsystem WHERE id = ${member_id}`, (error, results, fields) => {
            if (error) throw error

            if (results.length === 0) {
                this.db.query(`INSERT levelsystem (id, level, xp) VALUES (${member_id}, 1, 0)`, (error, results, fields) => {
                    if (error) throw error
                })
                this.db.commit()
            }
        })
    }

    levelsystem_add_xp(member_id: string) {
        this.db.query(`SELECT xp FROM levelsystem WHERE id = ${member_id}`, (error, results, fields) => {
            if (error) throw error

            if (results.length != 0) {
                const new_xp:number = results[0].xp + 1

                this.db.query(`UPDATE levelsystem SET xp = ${new_xp} WHERE id = ${member_id}`, (error, results, fields) => {
                    if (error) throw error
                })
                this.db.commit()
            }
        })
    }

    levelsystem_level_up(member_id: string, message: Message) {
        this.db.query(`SELECT * FROM levelsystem WHERE id = ${member_id}`, (error, results, fields) => {
            if (error) throw error

            if (results.length != 0) {
                const xp = results[0].xp
                const level = results[0].level

                if (level != 1) {
                    if (xp > level * level) {
                        const new_level = level + 1

                        this.db.query(`UPDATE levelsystem set level = ${new_level} WHERE id = ${member_id}`, (error, results, fields) => {
                            if (error) throw error
                        })
                        this.db.commit()

                        message.react("<:LevelUp:726876303319367751>")
                    }
                } else {
                    if (xp > 2) {
                        const new_level = level + 1

                        this.db.query(`UPDATE levelsystem set level = ${new_level} WHERE id = ${member_id}`, (error, results, fields) => {
                            if (error) throw error
                        })
                        this.db.commit()

                        message.react("<:LevelUp:726876303319367751>")
                    }
                }
            }
        })
    }

    levelsystem_removexp(xp: number, level: number, member_id: string) {
        this.db.query(`UPDATE levelsystem SET xp = ${xp}, level = ${level} WHERE id = ${member_id}`, (error, results, fields) => {
            if (error) throw error
        })
        this.db.commit()
    }
}