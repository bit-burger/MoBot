const { Events, userMention } = require("discord.js")

const creditDao = require("../../database/mo_credit_dao")
const nonChangeableMessagesDao = require("../../database/non_changeable_messages_dao")

module.exports = {
    // Setting event name and kind
    name: Events.MessageDelete,
    once: false,

    // Handling event
    async execute(message) {
        const isChangeable = await nonChangeableMessagesDao.isNonChangeableMessage(message.client, message.id)
        if (!isChangeable) return
        message.channel.send(userMention(message.author.id) + " was very naughty little boy :flushed:" +
            " and now has to be spanked :cry: :peach: :weary: :yum: :biting_lip:")
        const credits = await creditDao.getCredits(message.client, message.author.id)
        credits -= 100
        message.channel.send(`100 mo credits have therefore been subtracted from his mo credits, resulting in a score of ${credits}`)
    }
}