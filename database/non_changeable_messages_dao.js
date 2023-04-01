function getNonChangeMessages(client) {
    return client.sequelize.models.non_changeable_messages
}

async function setNonChangeableMessage(client, message) {
    const messageID = message.id
    const authorID = message.author.id
    nonChangeMessages = getNonChangeMessages(client)
    await nonChangeMessages.create({
        messageID, authorID,
    });
}

async function isNonChangeableMessage(client, messageID) {
    nonChangeMessages = getNonChangeMessages(client)
    const nonChangeableMessage = await nonChangeMessages.findOne({
        where: { messageID },
    })
    return nonChangeableMessage !== null
}

async function getMessageAuthorID(client, messageID) {
    const nonChangeableMessage = await nonChangeMessages.findOne({
        where: { messageID },
    })
    return nonChangeableMessage.authorID;
}

async function setIsChangeableMessage(client, messageID) {
    nonChangeMessages = getNonChangeMessages(client)
    await nonChangeMessages.destroy({
        where: { messageID }
    })
}

module.exports = { setNonChangeableMessage, isNonChangeableMessage, getMessageAuthorID, setIsChangeableMessage }
