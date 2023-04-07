const { Events, embedLength } = require("discord.js")
const fs = require("node:fs")
const dao = require("../../../database/mo_credit_dao")
const prophetDao = require("../../../database/prophet_dao")

const negativeWordsBuffer = fs.readFileSync("./resources/negative.txt")
const negativeWords = negativeWordsBuffer.toString().split(/\r?\n/)

function includesNegativeWord(s) {
    for (const negativeWord of negativeWords) {
        if (s.includes(negativeWord)) {
            return negativeWord;
        }
    }
    return undefined;
}

module.exports = {
    async checkForNegativeWords(message) {
        const content = message.content
        if (!/(?:^| )m[o0]|m[o0](?:^| )/i.test(content)) {
            return
        }

        const userID = message.author.id;
        let credits = await dao.getCredits(message.client, userID)
        let negative;

        if (content.includes("nicht") || content.includes("not") || content.includes("negativ")) {
            message.reply("Negative words are not allowed in the same sentence as Mos holy name, regardless of the context")
            negative = 10
        } else {
            const includedNegativeWord = includesNegativeWord(content)
            if (includedNegativeWord) {
                message.reply("How dare you refer to Mo the allmighty as " + includedNegativeWord)
                negative = 50
            }
        }

        if (!negative) return

        credits -= negative
        dao.setCredits(message.client, message.author.id, credits)
        message.reply(`Your lack of respect towards mo has cost you ${negative} credits! You now have ${credits} credits :rage:`)
    },
};
