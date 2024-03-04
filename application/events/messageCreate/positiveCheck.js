const { Events, embedLength } = require("discord.js")
const fs = require("node:fs")
const creditDao = require("../../../database/mo_credit_dao")
const nonChangeableMessagesDao = require("../../../database/non_changeable_messages_dao")

const positiveWordsBuffer = fs.readFileSync("./resources/positive_phrases.txt")
const positiveWords = positiveWordsBuffer
    .toString()
    .split(/\r?\n/)
    .map(phrase => phrase.toLowerCase())

module.exports = {
    async checkForPositiveWords(message) {
        const content = message.content
        if (!/(?:^| )m[o0]|m[o0](?:^| )/i.test(content)) {
            return
        }
        const isPositiveWord = positiveWords.includes(content.toLowerCase())
        if (!isPositiveWord) return;

        const userID = message.author.id;
        const credits = await creditDao.getCredits(message.client, userID) + 50

        message.reply("Mo appreciates your compliment, well done! You will be awarded 50 mo credits for good behaviour")
        message.reply(`You now have ${credits}. However, change or even delete your message and there will be consequences.`)

        nonChangeableMessagesDao.setNonChangeableMessage(message.client, message)
        creditDao.setCredits(message.client, message.author.id, credits)
    },
};
