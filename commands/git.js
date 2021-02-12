
const { MessageEmbed } = require("discord.js");


exports.run = async (client, message, args) => {
	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ Kaos  ").setColor("RANDOM").setTimestamp();
  if (!uye) return message.channel.send(embed.setDescription("Ses odasına gidilecek üyeyi belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == uye.voice.channelID) return message.channel.send(embed.setDescription("Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!")).then(x => x.delete({timeout: 5000}));
  if (message.member.hasPermission("ADMINISTRATOR")) {
    await message.member.voice.setChannel(uye.voice.channelID);
    message.react("773574751552929813").catch();
  } else {
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
    };
    message.channel.send(`${uye}`, {embed: embed.setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} senin ses kanalına girmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
	let cevap = c.first();
	if (cevap) {
	  message.member.voice.setChannel(uye.voice.channelID);
          msj.delete();
          message.react("773574751552929813").catch();
	};
      });
    });
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["git"],
  permLevel: 0,
}

exports.help = {
  name: "git"
};