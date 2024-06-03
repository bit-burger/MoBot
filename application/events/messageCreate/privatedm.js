const { Events } = require("discord.js")
const fs = require("node:fs")

module.exports = {
    async userInteraction(message) {
        const user = message.author;
        user.send("Sie möchten Mo nach Wissen fragen? Nutz dann hier den command /erklär")
    }
}