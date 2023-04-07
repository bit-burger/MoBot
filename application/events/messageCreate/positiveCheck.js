const { Events, embedLength } = require("discord.js")
const fs = require("node:fs")
const creditDao = require("../../../database/mo_credit_dao")
const prophetDao = require("../../../database/prophet_dao")

const positivePhrasesBuffer = fs.readFileSync("./resources/negative.txt")
const positivePhrases = positivePhrasesBuffer
    .toString()
    .split(/\r?\n/)
    .map(phrase => phrase.toLowerCase())

module.exports = {
    async checkForPositivePhrases(message) {
        const content = message.content

        const isPositivePhrase = positivePhrases.includes(content.toLowerCase())
        if (!isPositivePhrase) return;

        const userID = message.author.id;
        const credits = await creditDao.getCredits(message.client, userID) + 50

        message.reply("Thank you for sending this wonderful message, you will be highly awarded with 50 mo credits")
        message.reply(`You now have ${credits}, please refrain from deleting or editing this message, or else`)

        creditDao.setCredits(message.client, message.author.id, credits)
    },
};
