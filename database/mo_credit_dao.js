const { Op } = require("sequelize")

function getMoCredit(client) {
    return client.sequelize.models.mo_credit
}

async function getCredits(client, userID)  {
    moCredit = getMoCredit(client)
    const [user, created] = await moCredit.findOrCreate({
        where: { userID },
    });
    return user.credits
}

async function getCreditsMap(client, idList) {
    moCredit = getMoCredit(client)
    const map = new Map()
    const { count, rows } = await moCredit.findAndCountAll({
        where: {
            title: {
                [Op.in]: idList,
            }
        },
    });
    for(const moCredit of rows) {
        map.set(moCredit.userID, moCredit.credits)
    }
    for(const id of idList) {
        if(!map.has(id)) {
            map.set(id, 0)
        }
    }
    return map
}

async function setCredits(client, userID, credits) {
    moCredit = getMoCredit(client)
    const [user, created] = await moCredit.findOrCreate({
        where: { userID },
    }); 
    await user.update({credits})
}

module.exports = {getCredits, getCreditsMap, setCredits}
