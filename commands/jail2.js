const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");
const moment = require("moment");
const ayarlar = require('../config.json');

exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ KAOS").setColor("RANDOM").setTimestamp();
  if(!["775093093095571458","796777633621999696","796777635371286558"].some(role => message.member.roles.cache.get(role)) && !message.member.roles.cache.has(ayarlar.sahipRolu) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(embed.setDescription(`Jail komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
const jaillog = message.guild.channels.cache.find(c => c.id === '800354683847442512')//Jail Log
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if(!uye || !reason) return message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  let jaildekiler = jdb.get(`jail`) || [];
  await uye.roles.set(uye.roles.cache.has(ayarlar.boosterRolu) ? [ayarlar.jailRolu, ayarlar.boosterRolu] : [ayarlar.jailRolu]).catch();
  moment.locale("tr");
              qdb.add('case', 1)
  const codare = await qdb.fetch('case')
  if (!jaildekiler.some(j => j.includes(uye.id))) {
    jdb.push(`jail`, `j${uye.id}`);
    kdb.add(`kullanici.${message.author.id}.jail`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "JAIL",
      Sebep: reason,
      Zaman: Date.now(),
       Tarih: (`${moment(Date.now()).add(10,"hours").format("DD MMMM YYYY")}`) 
    });
  };
  if(uye.voice.channel) uye.voice.kick().catch();
  message.channel.send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${reason}** nedeniyle jaile atıldı!`)).catch();
jaillog.send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${reason}** nedeniyle jaile atıldı!\n **Cezai-i İşlem:** \`Jail\` (\`#${codare}\`)`)).catch();
};
exports.conf = { 
enabled: true, 
guildOnly: true, 
aliases: ["jail"]
}

exports.help = {
name: "jail" 
}
