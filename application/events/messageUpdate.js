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

        message.reply("**MO HAS WARNED YOU NOT TO EDIT THE MESSAGE, AS A RESULT YOUR CREDITS WILL BE SUBTRACTED BY 361**")
        message.reply(`**YOU NOW HAVE ${credits} CREDITS. TAKE THIS AS A FUCKING WARNING TO NEVER EDIT A MESSAGE POSITIVE OF MO AGAIN, NEVER!!!!!!** :rage: :rage: :rage:`)
        message.reply(`**:crown:  M O  :crown:  H A S  :crown:  S P O K E N  :crown:**`)
        message.reply("https://media.tenor.com/1j4ZfgiFYY0AAAAd/moschops.gif")

        setCredits(client, authorID, credits)
        setIsChangeableMessage(client, message.id)
    }
}