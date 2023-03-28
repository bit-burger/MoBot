// Importing classes
const { SlashCommandBuilder, Role, GuildMember, EmbedBuilder, Collection, userMention } = require("discord.js");

const dao = require("../../database/mo_credit_dao")

async function getUsersMapFromMentionable(mentionable) {
    if(mentionable instanceof Role) {
        const allMembers = await mentionable.guild.members.fetch()
        return allMembers.filter(member => member.roles.cache.has(mentionable.id))
        // .mapValues(member => member.user)
    }
    // if(mentionable instanceof GuildMember) {
        // mentionable = mentionable.user
    // }
    const m = new Collection()
    m.set(mentionable.id, mentionable)
    return m
}

module.exports = {
    // Setting command information and options
    data: new SlashCommandBuilder().setName("query").setDescription("query credits")
    .addMentionableOption((option) => 
        option.setName("who").setDescription("who to query results from").setRequired(true)
    )
    .addBooleanOption((option) => 
        option.setName("ephemeral").setDescription("keep the query to yourself, default false")
    )
    .addStringOption((option) => 
        option
        .setName("sort")
        .setDescription("Under which criteria to sort, default alphabet")
        .setChoices(
            {name: "sort by username alphabetically", value: "alphabet"},
            {name: "sort by credit", value: "credit"},
        )
    )
    .addBooleanOption((option) => 
        option
        .setName("reverse_sort")
        .setDescription("To reverse the criteria by which is sorted, default false")
    )
    .addBooleanOption((option) =>
        option
        .setName("exclude_nulls")
        .setDescription("remove users with 0 credit fromt the query, default false")
    )
    .addBooleanOption((option) =>
        option
        .setName("verbose")
        .setDescription("should parameters be sended in the message, default false")
    ),

    // Handling command autocomplete
    async autocomplete(interaction) {},

    // Handling command reponse
    async execute(interaction) {
        const mentionable = interaction.options.getMentionable("who");
        const mentionedUsersMap = await getUsersMapFromMentionable(mentionable);
        const mentionedUsersIds = [...mentionedUsersMap.keys()]
        const sort = interaction.options.getString("sort") ?? "alphabet"
        const reverseSort = interaction.options.getBoolean("reverse_sort") ?? false
        const ephemeral = interaction.options.getBoolean("ephemeral") ?? false
        const excludeNulls = interaction.options.getBoolean("exclude_nulls") ?? false
        const verbose = interaction.options.getBoolean("verbose") ?? false

        if(mentionedUsersIds.length === 0) {
            return interaction.reply({content: "No users found to query", ephemeral})
        }

        const creditsMap = await dao.getCreditsMap(interaction.client, mentionedUsersIds)
        let creditsUsers = mentionedUsersMap.map(
            (user, userID) => ({
                user,
                name: user.nickname ?? user.username ?? user.user.username,
                credits: creditsMap.get(userID)
            })
        )
        if(sort === "alphabet") {
            creditsUsers.sort(({name: name1}, {name: name2}) => name1.localeCompare(name2))
        } else {
            creditsUsers.sort(({credits: credits1}, {credits: credits2}) => credits2 - credits1)
        }

        if(reverseSort) {
            creditsUsers.reverse()
        }

        if(excludeNulls) {
            creditsUsers = creditsUsers.filter(({credits}) => credits !== 0) 
        }

        
        const embed = new EmbedBuilder()

        if(verbose) {
            let parameters = 
                `sort=${sort}\n`+ 
                `reverse_sort=${reverseSort}\n`+ 
                `exclude_nulls=${excludeNulls}\n` 
                `verbose=${verbose}\n` 
                `ephemeral=${ephemeral}` 

            embed
                .setTitle("Query result")
        	    .setDescription(parameters)
        }

        embed.addFields(
            { name: "users", value: creditsUsers.map(({user})=>userMention(user.id)).join("\n"), inline: true },
            { name: "credits", value: creditsUsers.map(({credits})=>credits).join("\n"), inline: true },
        )

        interaction.reply({ephemeral, embeds: [embed]})
    },
};
