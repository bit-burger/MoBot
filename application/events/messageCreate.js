const {Events} = require("discord.js")
const fs = require("node:fs")

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
    execute(message) {
        if(message.author.bot) return;
        const content = message.content.toLowerCase()
        if(!content.includes("mo") && !content.includes("m0")) return
        const includedNegativeWord = includesNegativeWord(content)
        if(content.includes("nicht")) {
            message.reply("Negative words are not allowed in the same sentence as Mos holy name, regardless of the context")
        }
        else if(includedNegativeWord) {
            message.reply("How dare you refer to Mo the allmighty as " + includedNegativeWord)
        }
    },
};
