const { Events } = require("discord.js")
const prophetDao = require("../../database/prophet_dao")

const { superMoBotHandler } = require("./messageCreate/superMoBot")
const { checkForNegativeWords } = require("./messageCreate/negativeCheck")
const { checkForPositiveWords } = require("./messageCreate/positiveCheck")
const creditDao = require("../../database/mo_credit_dao")

const { ignoredUsers = [] } = require("../../configuration.json")

module.exports = {
    // Setting event name and kind
    name: Events.MessageCreate,
    once: false,

    // Handling event
    async execute(message) {
        const authorId = message.author.id
        //if (message.author.bot) message.reply("2")
        if (ignoredUsers.includes(authorId)) return
        if (authorId === message.client.user.id) return;

        const currentCredits = await creditDao.getCredits(message.client, message.author.id)
        if(currentCredits < -10000) return
        const isBot = message.author.bot

       
        if (isBot) {
            message.reply("Mo-bot is superior")
        } else {
            superMoBotHandler(message)
            checkForNegativeWords(message)
            checkForPositiveWords(message)
        }
    }
}
