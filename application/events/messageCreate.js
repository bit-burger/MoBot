const {Events} = require("discord.js")
const fs = require("node:fs")
const dao = require("../../database/mo_credit_dao")

const negativeWordsBuffer = fs.readFileSync("./resources/negative.txt")
const negativeWords = negativeWordsBuffer.toString().split(/\r?\n/)

function includesNegativeWord(s) {
    for(const negativeWord of negativeWords) {
        if(s.includes(negativeWord)) {
            return negativeWord; 
        }
    }
    return undefined;
}

module.exports = {
    // Setting event name and kind
    name: Events.MessageCreate,
    once: false,

    // Handling event
    async execute(message) {
        if(message.author.bot) return;
        const content = message.content.toLowerCase()
        if(!content.includes("mo ") && !content.includes("m0 ")) return
        if(!/^mo/i.test(message) && !/^m0/i.test(message)) {
            if(!content.includes(" mo") && !content.includes(" m0") && !content.includes("|mo") && !content.includes("*mo") && !content.includes("@mo")) return
        }
        const includedNegativeWord = includesNegativeWord(content)
        if(content.includes("nicht") || content.includes("not") || content.includes("negativ")) {
            message.reply("Negative words are not allowed in the same sentence as Mos holy name, regardless of the context")
        }
        else if(includedNegativeWord) {
            message.reply("How dare you refer to Mo the allmighty as " + includedNegativeWord)
        }
        const userID = message.author.id;
        const credits = await dao.getCredits(message.client, userID)
        message.reply(credits.toString())
        await dao.setCredits(message.client, userID, credits + 10)
    },
};
