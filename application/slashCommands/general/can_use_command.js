const dao = require("../../../database/prophet_dao")

async function canUseCommand(interaction) {
    const client = interaction.client
    const isProphet = await dao.isProphet(client, interaction.user.id)
    if (!isProphet) {
        interaction.reply({
            content: "Cannot use this command, you are not listed as a prophet",
            ephemeral: true,
        })
    }
    return isProphet
}

module.exports = canUseCommand