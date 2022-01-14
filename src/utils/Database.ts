import mysql, { Connection } from "mysql"
import { Message } from "discord.js"
import { userLevelStats } from "../types/userStats"
import Config from "./Config";


export default class Database {
    private static db: Connection;

    static connect() {
        this.db = mysql.createConnection({
            host: Config.database.host,
            user: Config.database.userName,
            password: Config.database.password,
            database: Config.database.databaseName
        })

        console.log(Config.database.databaseName)

        this.db.connect()
    }

    static levelsystem_get_stats(member_id: string) {
        return new Promise<userLevelStats>(resolve => {
            this.db.query(`SELECT * FROM levelsystem ORDER BY xp DESC`, (error, results, fields) => {
                if (error) throw error
                
                var rank: number = 1

                for (const user of results) {
                    if (user.id === member_id) {
                        const level: number = user.level
                        const xp: number = user.xp
                        resolve({ level, xp, rank })
                    }

                    rank += 1
                }

                resolve(undefined)
            })
        })
        
    }

    static levelsystem_register(member_id: string) {
        return new Promise<void>(resolve => {
            this.db.query(`SELECT * FROM levelsystem WHERE id = ${member_id}`, (error, results, fields) => {
                if (error) throw error

                if (results.length === 0) {
                    this.db.query(`INSERT levelsystem (id, level, xp) VALUES (${member_id}, 1, 0)`, (error, results, fields) => {
                        if (error) throw error
                    })
                    this.db.commit()
                }

                resolve()
            })
        })
    }

    static async levelsystem_add_xp(member_id: string) {
        return new Promise<void>(resolve => {
            this.db.query(`SELECT xp FROM levelsystem WHERE id = ${member_id}`, (error, results, fields) => {
                if (error) throw error

                if (results.length != 0) {
                    const new_xp: number = results[0].xp + 1

                    this.db.query(`UPDATE levelsystem SET xp = ${new_xp} WHERE id = ${member_id}`, (error, results, fields) => {
                        if (error) throw error
                    })
                    this.db.commit()
                }

                resolve()
            })
        })
        
    }

    static levelsystem_level_up(member_id: string, message: Message) {
        return new Promise<void>(resolve => {
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

                resolve()
            })
        })
        
    }

    static levelsystem_removexp(xp: number, level: number, member_id: string) {
        return new Promise<void>(resolve => {
            this.db.query(`UPDATE levelsystem SET xp = ${xp}, level = ${level} WHERE id = ${member_id}`, (error, results, fields) => {
                if (error) throw error
            })
            this.db.commit()
            resolve()
        })
    }
}