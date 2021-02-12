const ayarlar = require("../config.json")
const Discord = require("discord.js");
const database = require("croxydb");
const ms = require("parse-ms");
const use = require("useful-tools");
 
exports.run = async (client, message, args) => {
 
  let vmute_sıra = await database.fetch(`vmutesira.${message.guild.id}`);
  let cmute_sıra = database.get(`cmutesira.${message.guild.id}`)
  let cmute_rol = message.guild.roles.cache.get("776825445554978837")
  let log = client.channels.cache.get("800354747172782090")
  let logs = client.channels.cache.get("800354747172782090")
 
let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(!["778416321868070913", "775093080986353673"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));


if (!kullanıcı) {
  return message.channel.send(new Discord.MessageEmbed()
.setDescription(`Bir kullanıcı etiketlemelisin veya kullanıcının ID'sini girmelisin!`)
.setFooter("EminBneCnms ❤️ Kaos")
.setColor(`RED`))
}
   
let cst2 = args[1];
if (!cst2)
return message.channel.send(new Discord.MessageEmbed()
.setDescription(`Kullanıcıyı cezalandırmak için bir süre belirtmelisin!`)
.setFooter("EminBneCnms ❤️ Kaos")
.setColor(`RED`))
   
let sebep = args.slice(2).join(" ")
if (!sebep)
return message.channel.send(new Discord.MessageEmbed()
.setDescription(`Kullanıcıyı cezalandırmak için bir sebep belirtmelisin!`)
.setFooter("EminBneCnms ❤️ Kaos")
 .setColor(`RED`))
 
  if (message.member.roles.highest.position <= kullanıcı.roles.highest.position) return message.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  if(!kullanıcı.bannable) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ ").setDescription("Botun yetkisi belirtilen üyeyi mutelemeye yetmiyor!")).then(x => x.delete({timeout: 10000}));

  
let x = cst2
let ise = x.split(" ").filter(val => val.match(/\d+/)).map(x => x.split("").filter(val => val.match(/\d+/)).join(""))
 
let sures;
let cst1 = ise[0]
if (cst2.includes("s")) sures = cst1 * 1000;
if (cst2.includes("m")) sures = cst1 * 60 * 1000;
if (cst2.includes("h")) sures = cst1 * 60 * 60 * 1000;
if (cst2.includes("d")) sures = cst1 * 24 * 60 * 60 * 1000;
 
let zaman = Date.now();
 
let sure;
let data = ms(sures)
let s = data.seconds;
let m = data.minutes;
let h = data.hours;
let d = data.days;
if (s) {
sure = `${s} saniye`;
}
if (m) {
sure = `${m} dakika`;
}
if (h) {
sure = `${h} saat`;
}
if (d) {
sure = `${d} gün`;
}
 
let sleaxing = new Discord.MessageEmbed()
 .setColor("AQUA")
 .setDescription(`Kullanıcı üzerinde hangi susturma eylemini kullanmak istiyorsunuz.`)
.setFooter("Emins ❤️ KAOS ")
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
database.set("chatmute." + kullanıcı.id, {
cmuteyiyen: kullanıcı.id,
cmuteatan: message.author.id,
cmutesebep: sebep,
cmutesüre: sures,
cmutezaman: zaman
})
 
message.channel.send(`${kullanıcı} ${sure} boyunca metin kanallarında susturuldu. (\`#${cmute_sıra}\`)`)
database.add(`cmutesira.${message.guild.id}`, 1)
setTimeout(() => {
const logmesaj1 = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.avatarURL())
.setDescription(`${kullanıcı} (\`${kullanıcı.id}\`) kullanıcı metin kanallarında susturuldu. \n\n• Chat Mute Atılma: \`${use.tarih(Date.now()+10800000)}\` \n• Chat Mute Bitiş: \`${use.tarih(Date.now()+sures+10800000)}\` \n• Süre: \`${sure}\` \n\n• Sebep: \`${sebep}\``)
.setColor("RED")
.setFooter("EminBneCnms ❤️ Kaos")
log.send(logmesaj1)
}, 2000);
   
setTimeout(() => {    
kullanıcı.roles.add(cmute_rol)
}, 3000);
sunucu.delete();
});
 
voice.on("collect", async r => {
database.set("voicemute." + kullanıcı.id, {
vmuteyiyen: kullanıcı.id,
vmuteatan: message.author.id,
vmutesebep: sebep,
vmutesüre: sures,
vmutezaman: zaman
})
 
message.channel.send(`${kullanıcı} ${sure} boyunca sesli kanalda susturuldu. (\`#${vmute_sıra}\`)`)
database.add(`vmutesira.${message.guild.id}`, 1)
setTimeout(() => {
const logmesaj = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.avatarURL())
.setDescription(`${kullanıcı} (\`${kullanıcı.id}\`) kullanıcı sesli kanalda susturuldu. \n\n• Mute Atılma: \`${use.tarih(Date.now()+10800000)}\` \n• Mute Bitiş: \`${use.tarih(Date.now()+sures+10800000)}\` \n• Süre: \`${sure}\` \n\n• Sebep: \`${sebep}\``)
.setColor("RED")
.setFooter("Emin&Boss ❤️ Kaos")
logs.send(logmesaj)
}, 2000);
 
setTimeout(() => {    
kullanıcı.voice.setMute(true)
}, 1000);
sunucu.delete();
});
 
setTimeout(() => {
sunucu.delete();
}, 120000);
});
 
 
};
exports.conf = {
 aliases: []
};
 
exports.help = {
 name: "mute"
};
 
