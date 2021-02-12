const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");
const ayarlar = require("../config.json");
const moment = require("moment");


exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ Kaos ").setColor("RANDOM").setTimestamp();
   if(!["775093078422847518","795705526918840331","796777635371286558","775093080986353673"].some(role => message.member.roles.cache.get(role)) && !message.member.roles.cache.has(ayarlar.sahipRolu) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(embed.setDescription(`Uyarı komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
 
  const uyarılog = message.guild.channels.cache.find(c => c.id === '800612729596411954')//Ban log kanalı  
 
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let sebep = args.splice(1).join(" ");
  if(!uye || !sebep) return message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  moment.locale("tr"); 
              qdb.add('case', 1)
  const codare = await qdb.fetch('case')
  kdb.add(`kullanici.${message.author.id}.uyari`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "UYARI",
      Sebep: sebep,
      Zaman: Date.now(),
      Tarih: (`${moment(Date.now()).add(10,"hours").format("DD MMMM YYYY")}`) 
         });
  message.channel.send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${sebep}** nedeniyle uyarıldı!`)).catch();
 uyarılog.send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${sebep}** nedeniyle uyarıldı!\n **Cezai-i İşlem:** \`Uyarı\` (\`#${codare}\`)`)).catch();
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uyar", "uyarı"],
  permLevel: 0,
}

exports.help = {
  name: "uyarı"
};
