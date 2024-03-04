const isTimeouted = require("./general/timeout_check.js")
const fs = require("node:fs")
const dao = require("../../database/mo_credit_dao")
const gedichteBuffer = fs.readFileSync("./resources/gedichte.txt")
const gedichte = gedichteBuffer.toString().split("|")
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const amount = gedichte.length.toString

function pickLanguage(language, pGedichte) {
if (language === "eng") return pGedichte[0];
if (language === "de") return pGedichte[1];
if (language === "chn") return pGedichte[2];
return "MASSIVE GIGA ERROR";
}
 
const moschopsGif = "https://media.tenor.com/1j4ZfgiFYY0AAAAC/moschops.gif";

module.exports = {
    // Setting command information and options
    data: new SlashCommandBuilder().setName("poem").setDescription("sends a heartwarming poem about Mo the Almighty")
    .addStringOption((option) =>
            option.setName("language")
                .addChoices({value: "de", name: "Deutsch"}, {value: "eng", name: "Englisch"}, {value: "chn", name: "Chinese"})
                .setDescription("Englisch oder Deutsch?")
                .setRequired(true)),

    // Handling command autocomplete
    async autocomplete(interaction) { },

    // Handling command reponse
    async execute(interaction) {
        if (await isTimeouted(interaction)) return
        let language = interaction.options.getString("language").toLowerCase()
        const embed = new EmbedBuilder()
        .setTitle("The Holy Mo Bible")
        .setDescription("**A few words of wisdom:**")
        .addFields({ name: " ", value: pickLanguage(language, gedichte) })
        .setImage("https://media.tenor.com/1j4ZfgiFYY0AAAAd/moschops.gif")
    //interaction.channel.send({ content:  })
    interaction.reply({ embeds: [embed] })
    
    },
};