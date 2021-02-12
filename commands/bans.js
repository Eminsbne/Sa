const { MessageEmbed } = require("discord.js");
const banAtanlar = new Set();
const moment = require("moment");
const ayarlar = require("../config.json")
const db = require("quick.db");
const kdb = new db.table("kullanici");

const tarih = moment(Date.parse(new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul"}))).format("LLL");

exports.run = async (client, msg, args, author) => {
 if(!["799957683405848586","775093078422847518","775093080986353673"].some(role => msg.member.roles.cache.get(role)) && !msg.member.roles.cache.has(ayarlar.sahipRolu) && (!msg.member.hasPermission("ADMINISTRATOR"))) return msg.channel.send("Bu komutu kullanabilmek için gerekli rollere sahip değilsin!").then(x => x.delete({timeout: 5000}));
   const banlog = msg.guild.channels.cache.find(c => c.id === '800354505626877962')//Ban log kanalı  

  if(args[0] && args[0].includes('list')) {
    try {
      msg.guild.fetchBans().then(bans => {
        msg.channel.send(`# Sunucudan yasaklanmış kişiler; ⛔\n\n${bans.map(c => `${c.user.id} | ${c.user.tag}`).join("\n")}\n\n# Toplam "${bans.size}" adet yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true});
      });
	  } catch (err) { msg.channel.send(`Yasaklı kullanıcı bulunmamakta!`).then(x => x.delete({timeout: 5000}));; }
    return;
  };
  
  if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))) {
    if(!args[1] || isNaN(args[1])) return msg.channel.send(new MessageEmbed().setDescription(`Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin!`)).then(x => x.delete({timeout: 5000}));;
    return msg.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => msg.channel.send(new MessageEmbed().setDescription(`**Banlanan Üye:** ${user.tag} (${user.id})\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`)).catch(err => msg.channel.send(new MessageEmbed().setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!"))).then(x => x.delete({timeout: 5000})));
  };
  moment.locale("tr");
 
  let uye = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
  
    if (!uye) return msg.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ KAOS").setDescription("**Geçerli bir üye ve sebep belirtmelisin!**")).then(x => x.delete({ timeout: 5000 }));

  let reason = args.splice(1).join(" ");
    
 
    if (!reason) return msg.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ KAOS").setDescription("**Sebep Yazmayı Unuttun Bruh!.**")).then(x => x.delete({ timeout: 5000 }));
 
  if (uye.permissions.has("BAN_MEMBERS") && uye.roles.cache.get(ayarlar.banH)) return msg.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ ").setDescription("**Ban yetkisi olan birisini banlayamazsın.**")).then(a => a.delete({ timeout: 5000 }));
if (!banAtanlar[msg.author.id]) banAtanlar[msg.author.id] = { sayi: 0 };
  if (banAtanlar[msg.author.id].sayi >= 5) return msg.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ KAOS").setDescription("**Günlük Ban Limitine Ulaştın 5 Banın Oldu Yeter Awk.**")).then(a => a.delete({ timeout: 5000 }));
 
  if (msg.member.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  if(!uye.bannable) return msg.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ KAOS ").setDescription("Botun yetkisi belirtilen üyeyi banlamaya yetmiyor!")).then(x => x.delete({timeout: 10000}));

 
  const sicil = db.get(`sicil_${uye.id}`);
  if (!sicil) db.set(`sicil_${uye.id}`, []);
     db.add('case', 1)
  const codare = await db.fetch('case')
        kdb.add(`kullanici.${msg.author.id}.ban`, 1);
      kdb.push(`kullanici.${uye.id}.sicil`, {
        Yetkili: msg.author.id,
        Tip: "BAN",
        Sebep: reason,
        Zaman: Date.now(),
         Tarih: (`${moment(Date.now()).add(10,"hours").format("DD MMMM YYYY")}`) 
      });
  await msg.guild.members.ban(uye.id, {reason: reason, days: 7 }).catch(err => msg.channel.send(err.message));
  await msg.channel.send(new MessageEmbed().setImage("https://media3.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif").setColor("RANDOM").setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic: true})).setFooter("Emin ❤️ ").setDescription(`\`${uye.user.tag}\` üyesi ${msg.author} tarafından **${reason}** nedeniyle **banlandı!**`));
  banlog.send(new MessageEmbed().setColor("RANDOM").setTimestamp().setFooter("Emin ❤️ KAOS").setTitle('Üye Banlandı!').setDescription(`**Banlayan Yetkili:** ${msg.author} (${msg.author.id})\n**Banlanan Üye:** ${uye.user.tag} (${uye.user.id})\n**Sebep:** ${reason} \n **Tarih:** \`${moment(Date.now()).add(10,"hours").format("DD MMMM YYYY")}\`\n  **Cezai-i İşlem:** \`Ban\`    (\`#${codare}\`)`));


                         db.add(`banAtma_${msg.author.id}`, 1);
  banAtanlar[msg.author.id].sayi++;
  setTimeout(() => {
    if (banAtanlar[msg.author.id].sayi >= 1) {
      banAtanlar[msg.author.id].sayi = 0;
    };
  }, 86400000);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yargı"],
  permLevel: 0
};

exports.help = {
  name: "ban",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
};
