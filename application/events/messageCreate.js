const { Events } = require("discord.js")
const prophetDao = require("../../database/prophet_dao")

const { superMoBotHandler } = require("./messageCreate/superMoBot")
const { checkForNegativeWords } = require("./messageCreate/negativeCheck")
const { checkForPositivePhrases } = require("./messageCreate/positiveCheck")

const { ignoredUsers = [] } = require("../../configuration.json")

module.exports = {
    // Setting event name and kind
    name: Events.MessageCreate,
    once: false,

    // Handling event
    async execute(message) {
        const authorId = message.author.id

        if (ignoredUsers.includes(authorId)) return
        if (authorId === message.client.user.id) return;

        const isProphet = await prophetDao.isProphet(message.client, authorId)
        const isBot = message.author.bot

        if (isProphet) {
            superMoBotHandler(message)
        } else if (isBot) {
            message.reply("Mo-bot is superior")
        } else {
            checkForNegativeWords(message)
            checkForPositivePhrases(message)
        }
    }
}