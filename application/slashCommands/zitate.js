const isTimeouted = require("./general/timeout_check.js")
const fs = require("node:fs")
const dao = require("../../database/mo_credit_dao")
const zitateBuffer = fs.readFileSync("./resources/bibelverse.txt")
const zitate = zitateBuffer
    .toString()
    .split(/\r?\n/)
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const amount = zitate.length.toString
function randomZitat(word, zahl) {
    return word[zahl].toString();
}
function zitatenArray(word, pInt) {
let alsString = "";
var i = 0;
while(i < pInt){
    let a = Math.floor(Math.random() * word.length)
    alsString = alsString + word[a].toString() + "\n\n";
    word.splice(a, 1);
    i++;
}
return alsString;
}
 
const moschopsGif = "https://media.tenor.com/1j4ZfgiFYY0AAAAC/moschops.gif";

module.exports = {
    // Setting command information and options
    data: new SlashCommandBuilder().setName("quote").setDescription("sends a quote from the Mo Bible")
    .addIntegerOption((option) =>
            option.setName("how_many")
                .setDescription("how many quotes do you want (max. 5 quotes)")
                .setRequired(true)),

    // Handling command autocomplete
    async autocomplete(interaction) { },

    // Handling command reponse
    async execute(interaction) {
        if (await isTimeouted(interaction)) return
        let amountOfQuotes = interaction.options.getInteger("how_many")
        if(amountOfQuotes > 5) amountOfQuotes = 5;
        //if(amountOfQuotes > 5) {
          //  var a = 0;
            //let wort = "";
            //while(a < zitate.length){
              //  wort = wort + zitate[a].toString() + "\n\n";
                //a++;
            //}
            //return wort;
        //}
        const embed = new EmbedBuilder()
        .setTitle("The Holy Mo Bible")
        .setDescription("**A few words of wisdom:**")
        .addFields({ name: " ", value: zitatenArray(zitate, amountOfQuotes) })
        .setImage("https://media.tenor.com/1j4ZfgiFYY0AAAAd/moschops.gif")
    //interaction.channel.send({ content:  })
    interaction.reply({ embeds: [embed] })
    
    },
};
