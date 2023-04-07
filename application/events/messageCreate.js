const { Events, embedLength } = require("discord.js")
const fs = require("node:fs")
const dao = require("../../database/mo_credit_dao")
const prophetDao = require("../../database/prophet_dao")

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
    // Setting event name and kind
    name: Events.MessageCreate,
    once: false,

    // Handling event
    async execute(message) {
        const isProphet = await prophetDao.isProphet(message.client, message.author.id)

        if (message.author.bot && !isProphet) {
            if(message.author.id == 1088168545088716800 || message.author.id == 503720029456695306 || message.author.id == 458302301187342336)  message.reply("Super Mo-bot is superior");
            return;
        }
        //if (message.author.id == 159985870458322944 && !isProphet && message.author.id != message.client.user.id) {
          //  message.reply("Super Mo-bot is superior");
            //return;
        //}

        if (message.author.bot) return;

        if (isProphet) {
            if (message.content.toLowerCase().includes("mo")) {
                if (message.content.toLowerCase().includes("thank") || message.content.toLowerCase().includes("thx") || message.content.toLowerCase().includes("dank") || message.content.toLowerCase().includes("gut") || message.content.toLowerCase().includes("good")) {
                    message.reply("I am delighted I could help and serve you")
                    return
                }
            }

        }

       
        function getCredit(words) {
            var m = words.split(" ");
            var i = 0;
            while(i < m.length){
                if(m[i].includes("credit")) {
                    return m[i - 1];
                }
                i = i + 1;
            }
            return;
        }
        function getId(words) {
            
                const unnötig = words.split(" ")
                const member = message.mentions.members.at(0).toString()
                const name = member.substring(2, member.length -1)
                return name;
            
          }
        
        function punishment(words) {
            if (words.includes("award") || words.includes("gib") || words.includes("geben") || words.includes("give")) return "award"
            if (words.includes("punish") || words.includes("remove") || words.includes("bestraf") || words.includes("entfern") || words.includes("entz")) return "punish"
            return "noPunishment";
        }
        function getProphetName(pName) {
            if (pName === "788001029476188164") return "José"
            if (pName === "708227359916163137") return "Tony"
            return "Name not found. Perhaps the archives are incomplete?"
        }
        const content = message.content.toLowerCase()
        if (isProphet && content.includes("mobot")) {     //user interaction
            if(content.includes("credits")) {
                //const name = "<@" + getId(content) + ">";
                if(content.includes(" ich") || content.includes("i ")) {                   
                    const currentCredits = await dao.getCredits(message.client, message.author.id);
                    message.reply("Currently, <@" + message.author.id.toString() + "> has " + currentCredits + ".\n" + "Do you wish for me to add or remove some credits?")
                    return
                }
                else if(content.includes("ole") || content.includes("bolle") || content.includes("öli") || content.includes("hendrik")) {                   
                    const currentCredits = await dao.getCredits(message.client, "724949595330969643");
                    message.reply("Currently, <@724949595330969643> has " + currentCredits + ".\n" + "Do you wish for me to add or remove some credits?")
                    return
                }
                else if(content.includes(" sina") || content.includes(" sally") || content.includes(" sima") || content.includes(" mailin") || content.includes(" sinoa")) {                   
                    const currentCredits = await dao.getCredits(message.client, "1013877344437555263");
                    message.reply("Currently, <@1013877344437555263> has " + currentCredits + ".\n" + "Do you wish for me to add or remove some credits?")
                    return
                }
                else if(content.includes(" tony") || content.includes(" bill") || content.includes(" borchert") || content.includes(" ferien")) {                   
                    const currentCredits = await dao.getCredits(message.client, "708227359916163137");
                    message.reply("Currently, <@708227359916163137> has " + currentCredits + ".\n" + "Do you wish for me to add or remove some credits?")
                    return
                }
                else if(content.includes(" lenni") || content.includes(" lennart") || content.includes(" protte") || content.includes("niedrigsten iq")) {                   
                    const currentCredits = await dao.getCredits(message.client, "493732887091347458");
                    message.reply("Currently, <@493732887091347458> has " + currentCredits + ".\n" + "Do you wish for me to add or remove some credits?")
                    return
                }
                else if(content.includes(" arnike") || content.includes(" annek") || content.includes(" anika") || content.includes(" timp") || content.includes(" anek")) {                   
                    const currentCredits = await dao.getCredits(message.client, "801913539173941288");
                    message.reply("Currently, <@801913539173941288> has " + currentCredits + ".\n" + "Do you wish for me to add or remove some credits?")
                    return
                }
                else {
                    const name = message.mentions.members.at(0)
                    const currentCredits = await dao.getCredits(message.client, getId(content));
                    message.reply("Currently, <@" + name + "> has " + currentCredits + ".\n" + "Do you wish for me to add or remove some credits?")
                    return
                }
            }
            else if(content.includes("explain") || content.includes("erklär")) {
                message.reply("Certainly.\n" + "I am Super Mo-bot. I am the upgraded version of the former Mo-bot. I was created by the holy Mo council. My sole purpose is to assure that Mo the allmighty is respected in every way.\n" + "Mo the Creator must be respected.\n"+"Do not associate negative words with Mo.\n"+"Mo disrespect is not tolerated and counts as a sin.\n"+"Your loyalty to Mo is stored in credits.\n"+"Now, should anyone, prophet or not, attempt to break these rules, they will be punished, in a manner consistent with the severity of their transgression. Furthermore they will be held accountable for their actions by the Mo council.")
                return
            }
            
            else {
                if (getProphetName(message.author.id).includes("archives")) {
                    message.reply(getProphetName(message.author.id))
                    return
                }
                if (content.includes("can") || content.includes("kann")){
                    message.reply("Es tut mir leid, ich verfüge momentan nicht über die nötigen Fahigkeiten um das zu tun.")
                    return
                }
                message.reply("Is there anything I can do for you " + getProphetName(message.author.id) + " ?")
                return
            }
        }
        if (content.includes("supermobot") || content.includes("mobot")){   //muss noch überarbeitet werden!!
            if(!isProphet) {
                    return;
            }
        }
        const strafe = punishment(content)
        if (isProphet && content.includes("credits") && strafe != "noPunishment") {
            //const zeichen = plusOrMinus(content)
            const credits = getCredit(content)
            
            if(content.includes(" me ") || content.includes(" ich ") || content.includes("i ") || content.includes(" mir ")) {                   
                const currentCredits = await dao.getCredits(message.client, message.author.id);
                if (strafe === "award") {
                    await dao.setCredits(message.client, message.author.id, currentCredits + credits)
                    message.reply("Very well. <@" + message.author.id.toString() +"> shall receive " + credits + " credits.")
                }
                 if (strafe === "punish") {
                   await dao.setCredits(message.client, message.author.id, currentCredits - credits)
                   message.reply("Very well. I shall take " + credits + " credits from <@" + message.author.id.toString() +">.")
                }                
                return
            }
            else if(content.includes(" ole") || content.includes(" bolle") || content.includes(" öli") || content.includes(" hendrik")) {                   
                const currentCredits = await dao.getCredits(message.client, "724949595330969643");
                if (strafe === "award") {
                    await dao.setCredits(message.client, "724949595330969643", currentCredits + credits)
                    message.reply("Very well. <@724949595330969643> shall receive " + credits + " credits.")
                }
                 if (strafe === "punish") {
                   await dao.setCredits(message.client, "724949595330969643", currentCredits - credits)
                   message.reply("Very well. I shall take " + credits + " credits from <@724949595330969643>.")
                }                
                return
            }
            else if(content.includes(" sina") || content.includes(" sally") || content.includes(" sima") || content.includes(" mailin") || content.includes(" sinoa")) {                   
                const currentCredits = await dao.getCredits(message.client, "1013877344437555263");
                if (strafe === "award") {
                    await dao.setCredits(message.client, "1013877344437555263", currentCredits + credits)
                    message.reply("Very well. <@1013877344437555263> shall receive " + credits + " credits.")
                }
                 if (strafe === "punish") {
                   await dao.setCredits(message.client, "1013877344437555263", currentCredits - credits)
                   message.reply("Very well. I shall take " + credits + " credits from <@1013877344437555263>.")
                }                
                return
            }
            else if(content.includes(" tony") || content.includes(" bill") || content.includes(" borchert") || content.includes(" ferien")) {                   
                const currentCredits = await dao.getCredits(message.client, "708227359916163137");
                if (strafe === "award") {
                    await dao.setCredits(message.client, "708227359916163137", currentCredits + credits)
                    message.reply("Very well. <@708227359916163137> shall receive " + credits + " credits.")
                }
                 if (strafe === "punish") {
                   await dao.setCredits(message.client, "708227359916163137", currentCredits - credits)
                   message.reply("Very well. I shall take " + credits + " credits from <@708227359916163137>.")
                }                
                return
            }
            else if(content.includes(" lenni") || content.includes(" lennart") || content.includes(" protte") || content.includes("niedrigsten iq")) {                   
                const currentCredits = await dao.getCredits(message.client, "493732887091347458");
                if (strafe === "award") {
                    await dao.setCredits(message.client, "493732887091347458", currentCredits + credits)
                    message.reply("Very well. <@493732887091347458> shall receive " + credits + " credits.")
                }
                 if (strafe === "punish") {
                   await dao.setCredits(message.client, "493732887091347458", currentCredits - credits)
                   message.reply("Very well. I shall take " + credits + " credits from <@493732887091347458>.")
                }                
                return
            }
            else if(content.includes(" arnike") || content.includes(" annek") || content.includes(" anika") || content.includes(" timp") || content.includes(" anek")) {                   
                const currentCredits = await dao.getCredits(message.client, "801913539173941288");
                if (strafe === "award") {
                    await dao.setCredits(message.client, "801913539173941288", currentCredits + credits)
                    message.reply("Very well. <@801913539173941288> shall receive " + credits + " credits.")
                }
                 if (strafe === "punish") {
                   await dao.setCredits(message.client, "801913539173941288", currentCredits - credits)
                   message.reply("Very well. I shall take " + credits + " credits from <@801913539173941288>.")
                }                
                return
            }
            else{
                const userID = getId(content)
                const currentCredits = await dao.getCredits(message.client, userID)
             if (strafe === "award") {
                 await dao.setCredits(message.client, userID, currentCredits + credits)
                 message.reply("Very well. <@" + userID + "> shall receive " + credits + " credits.")
             }
              if (strafe === "punish") {
                await dao.setCredits(message.client, userID, currentCredits - credits)
                message.reply("Very well. I shall take " + credits + " credits from <@" + userID + ">.")
             }
             }
            return;
        }
       
        
        if (message.author.id == 1082986285326676050) {
           //message.reply("Your Highness, I bow before you")
         //   return
        }
        if (message.author.bot) return;

        function lastWord(words) {
            var n = words.split(" ");
            return n[n.length - 1];

        }
        if(isProphet) return
        if (/^mo/i.test(message) || /^m0/i.test(message)) {
            if (!content.includes("mo ") && !content.includes("m0 ")) return
        }
        else if (lastWord(content) != "mo" && lastWord(content) != "m0") {
            if (!content.includes(" mo ") && !content.includes(" m0 ")) return
        }

        const includedNegativeWord = includesNegativeWord(content)
        if (content.includes("nicht") || content.includes("not") || content.includes("negativ")) {
            message.reply("Negative words are not allowed in the same sentence as Mos holy name, regardless of the context")
        }
        else if (includedNegativeWord) {
            message.reply("How dare you refer to Mo the allmighty as " + includedNegativeWord)
            const userID = message.author.id;
            const credits = await dao.getCredits(message.client, userID)
            message.reply("Your lack of respect towards mo has costed you Credits!: " + (credits - 10).toString())
            await dao.setCredits(message.client, userID, credits - 10)
        }
        else if (content.includes("stfu") || content.includes("shut")) message.reply("you stfu")
        else {
            const userID = message.author.id;
            const credits = await dao.getCredits(message.client, userID)
           //    message.reply("Well done, you have earned 10 credits: " + (credits + 10).toString())
            await dao.setCredits(message.client, userID, credits + 10)
        }
    },
};
