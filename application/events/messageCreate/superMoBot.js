const { Events } = require("discord.js")
const fs = require("node:fs")
const { userInteraction } = require("../messageCreate/privatedm.js")
const creditDao = require("../../../database/mo_credit_dao")
const chnText = fs.readFileSync("./resources/chnText.txt")
const deBuffer = fs.readFileSync("./resources/de.txt")
const de = deBuffer
    .toString()
    .split(/\r?\n/)///\r?\n/
const gifBuffer = fs.readFileSync("./resources/gifs.txt")
const gifs = gifBuffer
    .toString()
    .split("|")///\r?\n/
const chnBuffer = fs.readFileSync("./resources/chinese.txt")
const chn = chnBuffer
    .toString()
    .split(/\r?\n/)
const jpBuffer = fs.readFileSync("./resources/japanese.txt")
const jp = jpBuffer
    .toString()
    .split(/\r?\n/)
    
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function isChinese(pMessage, pChinese){
        var a = 0;
        var b = pChinese.length - 1;
        while(a<b){
            if(pMessage.includes(pChinese[a])) {
                return true;
                a = b;
            }
            a++;
        }
        return false;
    }
    function isJapanese(pMessage, pJapanese){
        var a = 0;
        var b = pJapanese.length - 1;
        while(a<b){
            if(pMessage.includes(pJapanese[a].toLowerCase())) {
                return true;
                a = b;
            }
            a++;
        }
        return false;
    }
    function isGerman(pMessage, pGerman){
        var a = 0;
        var b = pGerman.length - 1;
        while(a<b){
            if(pMessage.includes(pGerman[a].toLowerCase())) {
                return true;
                a = b;
            }
            a++;
        }
        return false;
    }
module.exports = {
    async superMoBotHandler(message) {
        const content = message.content.toLowerCase()
        if (content.includes("mo")) {
            if(content.includes("explain") || content.includes("erklär")) userInteraction(message);
        }
        if(isGerman(content, de)){
            const reply = await message.reply("https://tenor.com/view/ww2-croatia-gif-18606680")
            await timeout(2500)
            reply.delete()
            return
        }
        if (content.includes("emma")) message.reply(":troll:");
        if(content.includes("dua")){
            if(content.includes("dual")) return
            else{
               const dualipa = gifs[0].split(/\r?\n/).filter(gif => gif !== "");
               let a = Math.floor(Math.random() * dualipa.length)
               message.reply(dualipa[a]);
               return
            }
        }
        if(isChinese(content, chn)){
            const chinese = gifs[1].split(/\r?\n/).filter(gif => gif !== "");
            let a = Math.floor(Math.random() * chinese.length);
            message.reply(chnText + "\n"+ chinese[a]);
            return
            
        }
        if(isJapanese(content, jp)){
            const japanese = gifs[2].split(/\r?\n/).filter(gif => gif !== "");
            let a = Math.floor(Math.random() * japanese.length);
            message.reply(japanese[a]);
            message.reply(":no_entry::x::no_entry:")
            return
            
        }
        if(content.includes("dragonball") || content.includes("dragon ball")) {
            message.reply("https://tenor.com/view/goku-dragon-ball-anime-peace-sunglasses-gif-17933323");
            return
        }
    }

     
}