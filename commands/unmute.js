const Discord = require("discord.js");
const database = require("croxydb");
const ms = require("parse-ms");
const sleax = require("../config.json");
 
exports.run = async (client, message, args) => {
 
let vmute_sıra = await database.fetch(`vmutesira.${message.guild.id}`);
let cmute_sıra = database.get(`cmutesira.${message.guild.id}`)
let cmute_rol = message.guild.roles.cache.get("776825445554978837")
let log = client.channels.cache.get("800354747172782090")
let logs = client.channels.cache.get("800354747172782090")
 
let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
 
 if(!["775093078422847518", "778416321868070913","775093080986353673"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

 
if (!kullanıcı) {
return message.channel.send(new Discord.MessageEmbed()
.setDescription(`Bir kullanıcı etiketlemelisin veya kullanıcının ID'sini girmelisin!`)
.setColor(`RED`))
}
   
let sleaxing = new Discord.MessageEmbed()
 .setColor("RED")
 .setDescription(`Kullanıcı üzerinde eylem uygulamak için un-mute türünü seçmelisin!`)
 message.channel.send(sleaxing).then(sunucu => {
   sunucu
   .react("801356267850825738")
   .then(() => sunucu.react("801356240654958592"));
   
let chats = (reaction, user) =>
reaction.emoji.id === "801356267850825738" && user.id === message.author.id;
let iptals = (reaction, user) =>
reaction.emoji.id === "801356240654958592" && user.id === message.author.id;
 
let chat = sunucu.createReactionCollector(chats, { time: 0 });
let voice = sunucu.createReactionCollector(iptals, { time: 0 });
 
chat.on("collect", async r => {
//sleax//
database.delete("chatmute." + kullanıcı.id)
 
message.channel.send(`${kullanıcı} kullanıcının metin kanallarındaki mutesi yetkililer tarafından kaldırıldı.`)
setTimeout(() => {
const logmesaj1 = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.avatarURL())
.setDescription(`${kullanıcı} kullanıcının metin kanallarındaki mutesi yetkililer tarafından kaldırıldı.`)
.setColor("GREEN")
log.send(logmesaj1)
}, 2000);
   
setTimeout(() => {    
kullanıcı.roles.remove(cmute_rol)
}, 3000);
sunucu.delete();
});
 
voice.on("collect", async r => {
database.delete("voicemute." + kullanıcı.id)
 
message.channel.send(`${kullanıcı} kullanıcının sesli kanalda mutesi yetkililer tarafından kaldırıldı.`)
setTimeout(() => {
const logmesaj = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.avatarURL())
.setDescription(`${kullanıcı} kullanıcının sesli kanalda mutesi yetkililer tarafından kaldırıldı.`)
.setColor("GREEN")
logs.send(logmesaj)
}, 2000);
 
setTimeout(() => {    
kullanıcı.voice.setMute(false)
}, 1000);
sunucu.delete();
});
 
setTimeout(() => {
sunucu.delete();
}, 120000);
});
 
 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute", "unmute"],
  permLevel: 0,
}

exports.help = {
  name: "unmute"
};
