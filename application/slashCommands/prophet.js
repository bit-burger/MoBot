const canUseCommand = require("./general/can_use_command")

const dao = require("../../database/prophet_dao")

const { SlashCommandBuilder, userMention, Sticker, GuildStickerManager } = require("discord.js");

const moschopsGif = "https://media.tenor.com/1j4ZfgiFYY0AAAAC/moschops.gif";

module.exports = {
    // Setting command information and options
    data: new SlashCommandBuilder().setName("set_prophet").setDescription("change credits of a single user")
        .addUserOption((option) =>
            option.setName("who").setDescription("who to query results from").setRequired(true)
        ),

    // Handling command autocomplete
    async autocomplete(interaction) { },

    // Handling command reponse
    async execute(interaction) {
        if (!await canUseCommand(interaction)) return
        const user = interaction.options.getUser("who")
        interaction.reply({
            content: userMention(user.id) + " has been made a prophet",
        })
        await dao.setProphet(interaction.client, user.id)
    },
};
