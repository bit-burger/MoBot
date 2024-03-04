const dao = require("../../database/mo_credit_dao")
const isTimeouted = require("./general/timeout_check.js")
const fs = require("node:fs")
const positiveWordsBuffer = fs.readFileSync("./resources/positive_phrases.txt")
const positiveWords = positiveWordsBuffer.toString().split("()§&/")
const englishWordsBuffer = positiveWords[0]
const englishWords = englishWordsBuffer.split(/\r?\n/)
const germanWordsBuffer = positiveWords[1]
const germanWords = germanWordsBuffer.split(/\r?\n/)

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const moschopsGif = "https://media.tenor.com/1j4ZfgiFYY0AAAAC/moschops.gif";

const positivePhrases = "hurensohn"
function positiveWord(planguage, pEnglish, pGerman){
    let ausgabe = "";
if (planguage === "eng") {
    let a = Math.floor(Math.random() * pEnglish.length)
    ausgabe = "Mo is " + pEnglish[a];
}
else {
    let a = Math.floor(Math.random() * pGerman.length)
    ausgabe = "Mo ist " + pGerman[a];
}
return ausgabe;
}
    //"*" + fs
    //.readFileSync("./resources/positive_phrases.txt")
    //.toString() + "*"

module.exports = {
    // Setting command information and options
    data: new SlashCommandBuilder().setName("redeem").setDescription("learn how to get more mo credits")
    .addStringOption((option) =>
            option.setName("language")
                .addChoices({value: "de", name: "Deutsch"}, {value: "eng", name: "Englisch"})
                .setDescription("Englisch oder Deutsch? (Default de)")
                .setRequired(true)),
    // Handling command autocomplete
    async autocomplete(interaction) { },

    // Handling command reponse
    async execute(interaction) {
        if (await isTimeouted(interaction)) return
        let language = interaction.options.getString("language").toLowerCase()
        const embed = new EmbedBuilder()
            .setTitle("Congratulations!! You have finally decided to pay off your debt, follow the instructions to get mo credits!!!:")
            .setDescription("**1. Copy one of the following messages and send it in a channel available to the Mo-Bot:**")
            .addFields({ name: " ", value: positiveWord(language, englishWords, germanWords) })
            .setImage("https://media.tenor.com/1j4ZfgiFYY0AAAAd/moschops.gif")
        //interaction.channel.send({ content:  })
        interaction.reply({embeds: [embed]})
    },
};