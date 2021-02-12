const Discord = require("discord.js");
 const ayar = require("../config.json");

const mapping = {
  " ": "   ",
   "0": "<a:kaos_0:773574749175152640>",
  "1": "<a:kaos_1:773574709438578739>",
  "2": "<a:kaos_2:773574739678724096>",
  "3": "<a:kaos_3:773574721987674132>",
  "4": "<a:kaos_4:773574725505908747>",
  "5": "<a:kaos_5:773574696192966676>",
  "6": "<a:kaos_6:773574744443453507>",
  "7": "<a:kaos_7:773574699108139018>",
  "8": "<a:kaos_8:773574702772912158>",
  "9": "<a:kaos_9:773574692052926484>",
  "!": "❕",
  "?": "❔",
  "#": "#️⃣",
  "*": "*️⃣"
};
let tags = 'ᵏᵃᵒˢ'
"abcdefghijklmnopqr".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});

exports.run = async (client, message, args) => {
   if(!["777599397172609064","777599397172609064"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 10000}));
 

  let toplam = message.guild.memberCount;
  let sunucu = ' <a:kaos_gul:768770935314317323> **Sunucudaki Toplam Üye** ' + 
      `${toplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
  let online = message.guild.members.cache.filter(m => m.presence.status !== "offline").size
  let offline2 =  ' <a:kaos_gul:768770935314317323> **Sunucudaki Toplam Aktif** ' +
     `${online}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")
  
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0
   for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  
  let booster =  ' <a:kaos_gul:768770935314317323> **Ses Kanallarında** ' +
     `${count}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")

    var boosters = message.guild.roles.cache.get("761926173466558504").members.size
    let boosterim = ' <a:kaos_gul:768770935314317323> **Sunucudaki Toplam Booster** ' +
      `${boosters}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
      var tagsayi = message.guild.roles.cache.get("777599397172609064").members.size
      let tag = '<a:kaos_gul:768770935314317323> **Sunucudaki Toplam Taglı** ' +
        `${tagsayi}`
        .split("")
        .map(c => mapping[c] || c)
        .join("")
    
const embed = new Discord.MessageEmbed()
.setTitle('KAOS')
.setColor('AQUA')
.setFooter("Emin ❤️ KAOS")
.setDescription('' + sunucu + '\n' + offline2 +  '\n'+ booster +'\n '+ tag  + '\n' + boosterim )
 message.channel.send(embed)
  let onnl = `**Toplam Üye:** ${sunucu}\n**Aktif Üye:** ${offline2}\n**Tagdaki Üye:** ${tag}\n**Sesteki Üye:** ${count}`
client.channels.cache.get(`775093206576005152`).setTopic(onnl)

};
exports.conf = {
  aliases: ['say'],
  permLevel: 0
};

exports.help = {
  name: 'say'
};