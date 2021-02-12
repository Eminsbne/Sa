const { MessageEmbed } = require("discord.js");
const ayarlar = require("../config.json");

exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ KAOS ").setColor("RANDOM").setTimestamp();
  if(!["799957683405848586"].some(role => message.member.roles.cache.get(role)) && !message.member.roles.cache.has(ayarlar.sahipRolu) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(embed.setDescription(`Unban komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
 
  const logs = message.guild.channels.cache.find(c => c.id === '800354505626877962')//Ban log kanalı  

  if (!args[0] || isNaN(args[0])) return message.channel.send(embed.setDescription("Geçerli bir kişi ID'si belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  let kisi = await client.users.fetch(args[0]);
  if(kisi) {
    let reason = args.splice(1).join(" ") || "sebep belirtilmedi";
    message.guild.members.unban(kisi.id).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
    message.react("773574751552929813").catch();
    logs.send(new MessageEmbed().setColor("RANDOM").setTimestamp().setFooter("Emin ❤️ KAOS ").setTitle('Ban Kaldırıldı!').setDescription(`**Kaldıran Yetkili:** ${message.author} (${message.author.id})\n**Banı Kaldırılan Üye:** ${kisi.tag} (${kisi.id})`));
  } else {
    message.channel.send(embed.setDescription("Geçerli bir kişi ID'si belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  };
};
exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: ["yasak-kaldır"],
    permLevel: 0,
}
exports.help = {
  name: "unban",
  description: 'Son silinen mesajı yakalar.',
  usage: 'ehe'
} 