const dao = require("../../database/mo_credit_dao")
const canUseCommand = require("./general/can_use_command")


const { SlashCommandBuilder, userMention, Role, GuildMember, Sticker, GuildStickerManager } = require("discord.js");

const moschopsGif = "https://media.tenor.com/1j4ZfgiFYY0AAAAC/moschops.gif";

module.exports = {
    // Setting command information and options
    data: new SlashCommandBuilder().setName("set").setDescription("set credits of a single user")
        .addUserOption((option) =>
            option.setName("who").setDescription("who to query results from").setRequired(true)
        )
        .addIntegerOption((option) =>
            option.setName("how_much")
                .setDescription("how many credits should the selected person have")
                .setRequired(true)),

    // Handling command autocomplete
    async autocomplete(interaction) { },

    // Handling command reponse
    async execute(interaction) {
        if (!await canUseCommand(interaction)) return
        const user = interaction.options.getUser("who")
        let credits = interaction.options.getInteger("how_much")
        await dao.setCredits(interaction.client, user.id, credits)
        interaction.reply({
            content: "The credits of " + userMention(user.id) + " have been fixed! :muscle::muscle:\n" +
                `They now have ${credits} mo credits :flushed:`,
        })
        interaction.channel.send({ content: "https://media.tenor.com/1j4ZfgiFYY0AAAAd/moschops.gif" })
    },
};