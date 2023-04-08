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
        dmChannel.send("A message of yours to get 50 mo credits, has been deleted. " +
            `This has resulted in the subtraction of the credits, and you now have ${credits} credits`)
        nonChangeableMessagesDao.setIsChangeableMessage(message.client, message.id)
    }
}