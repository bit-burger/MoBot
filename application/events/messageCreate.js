const {Events} = require("discord.js")
const fs = require("node:fs")

const negativeWordsBuffer = fs.readFileSync("./resources/negative.txt")
const negativeWords = negativeWordsBuffer.toString().split("\n")

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
        if(includedNegativeWord) {
            message.reply("fake, do not use " + includedNegativeWord)
        }
    },
};
