const dao = require("../../database/mo_credit_dao")
const canUseCommand = require("./general/can_use_command")
const fs = require("node:fs")

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const moschopsGif = "https://media.tenor.com/1j4ZfgiFYY0AAAAC/moschops.gif";

const positivePhrases = "*" + fs
    .readFileSync("./resources/positive_phrases.txt")
    .toString() + "*"

module.exports = {
    // Setting command information and options
    data: new SlashCommandBuilder().setName("redeem").setDescription("learn how to get more mo credits"),

    // Handling command autocomplete
    async autocomplete(interaction) { },

    // Handling command reponse
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Congratulations!! You have finally decided to pay off your debt, follow the instructions to get mo credits!!!:")
            .setDescription("**1. Copy one of the following messages and send it in a channel available to the Mo-Bot:**")
            .addFields({ name: " ", value: positivePhrases })
            .setImage("https://media.tenor.com/1j4ZfgiFYY0AAAAd/moschops.gif")
        //interaction.channel.send({ content:  })
        interaction.reply({ embeds: [embed] })
    },
};