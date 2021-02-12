const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\

if(!["761883834387660824"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

//-------------------------------------------------------------------------------\\
  
  
  let ramo = "**Sesli Kanalda Olan Yetkililer:**\n";
  let ramo2 = "**Sesli Kanalda Olmayan Yetkililer:**\n";
  message.guild.roles.cache.get("778416321868070913").members.map(r => {
    ramo += r.voice.channel ? "  `<@" + r.user.id + ">`" : "";
    ramo2 += !r.voice.channel ? "  `<@" + r.user.id + ">`" : "";
  });

  const ramoembed = new Discord.MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription("" + ramo2 + "")
  message.channel.send(ramoembed).then(s => s.s);
};
module.exports.conf = {
  aliases: ["sesli","yetkilisay"]
};

module.exports.help = {
  name: "sesteki-yetkililer"
};
