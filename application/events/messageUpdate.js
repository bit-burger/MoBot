const { Events } = require("discord.js")

const { isNonChangeableMessage, setIsChangeableMessage } = require("../../database/non_changeable_messages_dao")
const { getCredits, setCredits } = require("../../database/mo_credit_dao")

module.exports = {
    // Setting event name and kind
    name: Events.MessageUpdate,
    once: false,

    // Handling event
    async execute(_, message, client) {
        const authorID = message.author.id
        const isNonChangeable = await isNonChangeableMessage(client, message.id)

        if (!isNonChangeable) return

        const credits = await getCredits(client, authorID) - 361

        message.reply("How dare you try to deceive Mo! Attempted deception is a sin and will not be tolerated.")
        message.reply(`Your actions have costed you 361 credits. You now have ${credits} credits.`)
        message.reply(`The Mo Council will look into your crime and your punishment may be abolished or could worsen, depending on their judgement.`)

        setCredits(client, authorID, credits)
        setIsChangeableMessage(client, message.id)
    }
}