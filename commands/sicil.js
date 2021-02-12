const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");

module.exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\
  
if(!["778416321868070913", "775093093095571458"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  
let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
let uye = message.guild.member(kullanici);
let sicil = kdb.get(`kullanici.${uye.id}.sicil`) || [];
moment.locale("tr");
sicil = sicil.reverse();
let sicilPanel = sicil.length > 0 ? sicil.map((value, index) => `\`${index + 1}.\` **[${value.Tip}]**  \`${value.Tarih}\` Tarihinde **${value.Sebep}** Sebebinden Dolayı  ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} tarafından cezalandırıldı.`).join("\n") : "Temiz!";
message.react('768770935314317323')
message.channel.send(new MessageEmbed()
.setColor("RED")
.setDescription(`**<@!${uye.id}> Üyenin Sicili** \n\n ${sicilPanel}`)
.setFooter(`Emin ❤️ KAOS`))
};

module.exports.conf = {
    guildOnly: true,
    aliases: ["sicil"],
    permLevel: 0
};

module.exports.help = {
    name: "geçmiş",
};
