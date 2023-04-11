const { Events, userMention } = require("discord.js")

const creditDao = require("../../database/mo_credit_dao")
const nonChangeableMessagesDao = require("../../database/non_changeable_messages_dao")

module.exports = {
    // Setting event name and kind
    name: Events.MessageDelete,
    once: false,

    // Handling event
    async execute(message) {
        const isNonChangeable = await nonChangeableMessagesDao.isNonChangeableMessage(message.client, message.id)
        if (!isNonChangeable) return

        const credits = await creditDao.getCredits(message.client, message.author.id) - 50

        const authorID = await nonChangeableMessagesDao.getMessageAuthorID(message.client, message.id)
        const user = await message.client.users.fetch(authorID)
        const dmChannel = await user.createDM()
        dmChannel.send("How dare you delete your message. Mo is not pleased. " +
            `The credits given to you have now been removed, you now have ${credits} credits`)
        nonChangeableMessagesDao.setIsChangeableMessage(message.client, message.id)
    }
}