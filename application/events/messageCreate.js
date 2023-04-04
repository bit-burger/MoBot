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
        if(message.author.bot && message.author.id != 1087435325099483166 && message.author.id != 1088168545088716800) {
            message.reply("Super Mo-bot is superior");
            return;
        }
       
        if(message.author.id == 788001029476188164 || message.author.id == 708227359916163137 || message.author.id == 1082986285326676050) {
            if(message.content.toLowerCase().includes("mo")){
                if(message.content.toLowerCase().includes("thank") || message.content.toLowerCase().includes("thx") || message.content.toLowerCase().includes("dank") || message.content.toLowerCase().includes("gut") || message.content.toLowerCase().includes("good")) {
                    message.reply("I am delighted I could help and serve you")
                    return
                }
            }
            
        }
        if(message.author.id == 567666740947976222) {
            
            return
        }
        function getName(words) {
            var m = words.split(" ");
            return m[2];
        } 
        function getCredit(words) {
            var m = words.split(" ");
            return m[m.length - 2];
        } 
        function plusOrMinus(words) {
            var m = words.split(" ");
            return m[m.length - 2];
        } 
        function punishment(words) {
            var m = words.split(" ");
            return m[1];
        } 
        const content = message.content.toLowerCase() 
        if(message.author.id == 788001029476188164 && content.includes("supermobot")) {
            const strafe = punishment(content)
            const name = getName(content)
            const zeichen = plusOrMinus(content)
            const credits = getCredit(content)
            const userID = name.substring(2, name.length - 1)
            const currentCredits = await dao.getCredits(message.client, userID)
            if(strafe === "award" || strafe === "belohn") {
                await dao.setCredits(message.client, userID, currentCredits + credits)
                message.reply("Very well. " + name + " shall receive " + credits + " credits.")
            }
            if(strafe === "punish" || strafe === "bestraf") {
                await dao.setCredits(message.client, userID, currentCredits - credits)
                message.reply("Very well. I shall take " + credits + " credits from " + name)
            }
            return;
        }
        else if(message.author.id == 1082986285326676050 && content.includes("supermobot")) {
            const strafe = punishment(content)
            const name = getName(content)
            const zeichen = plusOrMinus(content)
            const credits = getCredit(content)
            const userID = name.substring(2, name.length - 1)
            const currentCredits = await dao.getCredits(message.client, userID)
            if(strafe === "award" || strafe === "belohn") {
                await dao.setCredits(message.client, userID, currentCredits + credits)
                message.reply("Very well. " + name + " shall receive " + credits + " credits.")
            }
            if(strafe === "punish" || strafe === "bestraf") {
                await dao.setCredits(message.client, userID, currentCredits - credits)
                message.reply("Very well. I shall take " + credits + " credits from " + name)
            }
            return;
        }
        if(message.author.id == 1082986285326676050) {
            message.reply("Your Highness, I bow before you")
            return
        }
        if(message.author.bot) return;
       
        function lastWord(words) {
            var n = words.split(" ");
            return n[n.length - 1];
        
        } 
        if(/^mo/i.test(message) || /^m0/i.test(message)) {
            if(!content.includes("mo ") && !content.includes("m0 ")) return
        } 
        else if(lastWord(content) != "mo" && lastWord(content) != "m0"){
            if(!content.includes(" mo ") && !content.includes(" m0 ")) return
        }

        const includedNegativeWord = includesNegativeWord(content)
        if(content.includes("nicht") || content.includes("not") || content.includes("negativ")) {
            message.reply("Negative words are not allowed in the same sentence as Mos holy name, regardless of the context")
        }
        else if(includedNegativeWord) {
            message.reply("How dare you refer to Mo the allmighty as " + includedNegativeWord)
            const userID = message.author.id;
            const credits = await dao.getCredits(message.client, userID)
            message.reply("Your lack of respect towards mo has costed you Credits!: " + (credits - 10).toString())
            await dao.setCredits(message.client, userID, credits - 10)
        }
        else if(content.includes("stfu") || content.includes("shut")) message.reply("you stfu") 
        else {
            const userID = message.author.id;
            const credits = await dao.getCredits(message.client, userID)
            message.reply("Well done, you have earned 10 credits: " + (credits +10).toString())
            await dao.setCredits(message.client, userID, credits + 10)
        }
    },
};
