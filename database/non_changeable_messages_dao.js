function getNonChangeMessages(client) {
    return client.sequelize.models.non_changeable_messages
}

async function setNonChangeableMessage(client, messageID) {
    nonChangeMessages = getNonChangeMessages(client)
    await nonChangeMessages.findOrCreate({
        where: { messageID },
    });
}

async function isNonChangeableMessage(client, messageID) {
    await nonChangeMessages.findOne({
        where: { messageID },
    });
}

module.exports = { setNonChangeableMessage, isNonChangeableMessage }
