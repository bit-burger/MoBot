const dao = require("../../../database/mo_credit_dao")
async function isTimeouted(interaction) {
    const client = interaction.client
    const currentCredits = await dao.getCredits(client, interaction.user.id)
    const isTimeouted = false;
    if(currentCredits < -10000) isTimeouted = true;
    if(isTimeouted){
        interaction.reply({
            content: "Kein Bock mehr auf dich, du Affe",
            ephemeral: true,
        })
    }
    return isTimeouted;

}
module.exports = isTimeouted