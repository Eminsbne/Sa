const Discord = require('discord.js')
const ayarlar = require('../config.json')

exports.run = async (client ,message ,args) => {
  if(!["775093093095571458","775093078422847518","796777635371286558"].some(role => message.member.roles.cache.get(role)) && !message.member.roles.cache.has(ayarlar.sahipRolu) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(embed.setDescription(`Jail komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
   
  const jaillog = message.guild.channels.cache.find(c => c.id === '800354683847442512')//Ban log kanalı  

    let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!kullanıcı)
             return message.channel.send('Lutfen Bir Kullanıcı Belirtin.')
let cezlaırol = message.guild.roles.cache.get("775093116864692246"); //Cezalı Rol Id
let kayıtsızrol = message.guild.roles.cache.get("775093130722148373"); // Kayıtsız Rol Id
if(!cezlaırol) return message.guild.owner.send(`Sunucuda Cezalı Rolunu Bulamadıgım!`)
if(!kayıtsızrol) return message.guild.owner.send(`Sunucuda Kayıtsızı Rolunu Bulamadım!`)

let member = message.guild.member(kullanıcı)
await member.roles.add(kayıtsızrol) // 
await member.roles.remove(cezlaırol)

jaillog.send(new Discord.MessageEmbed().setDescription(`${kullanıcı} **Üyesi, ${message.author} Tarafından Jailden Çıkarıldı!**`))

const dcs = new Discord.MessageEmbed()
.setTitle('Başarılı :)')
.setDescription(`Başarıyla ${kullanıcı} adlı kullanıcı jailden cıkartıldı.`)
.setFooter('Emin 💜 Kaos ')
message.channel.send(dcs)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "unjail",
  description: "Belirtiniz Kullanıyı Cezalıdan Kaldırır!",
  usage: "unjail <kullanıcı>"
};