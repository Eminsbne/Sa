const { MessageEmbed } = require("discord.js");
const ayarlar = require("../config.json");

exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ ").setColor("RANDOM").setTimestamp();

  if(!message.member.roles.cache.has(ayarlar.sahipRolu)) return message.channel.send(embed.setDescription(`Yoklama komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  if(!message.member.voice || message.member.voice.channelID != ayarlar.toplantiSesKanali) return;
  
  let members = message.guild.members.cache.filter(member => member.roles.cache.has(ayarlar.katildiRolu) && member.voice.channelID != ayarlar.toplantiSesKanali);
  members.array().forEach((member, index) => {
    setTimeout(() => {
      member.roles.remove(ayarlar.katildiRolu).catch();
    }, index * 1250)
  });
  let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(ayarlar.katildiRolu) && !member.user.bot)
  verildi.array().forEach((member, index) => {
    setTimeout(() => {
      member.roles.add(ayarlar.katildiRolu).catch();
    }, index * 1250)
  });
  message.channel.send(embed.setDescription(`Katıldı rolü dağıtılmaya başlandı! \n\n🟢 **Rol Verilecek:** ${verildi.size} \n🔴 **Rol Alınacak:** ${members.size}`)).catch();
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yoklama"],
  permLevel: 0,
}

exports.help = {
  name: 'yoklama'
  
}
