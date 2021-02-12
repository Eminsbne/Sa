const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../config.json");
const moment = require("moment");
exports.run = async (client, message, args) => {

    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter("EminBneCnms 🤍");
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let data = rdb.get(`reg.${member.id}`);

   
 let ban = kdb.get(`kullanici.${member.id}.ban`) || 0;
 let uyari = kdb.get(`kullanici.${member.id}.uyari`) || 0;
  let kick = kdb.get(`kullanici.${member.id}.kick`) || 0;
 
 let jail = kdb.get(`kullanici.${member.id}.jail`) || 0;
 let toplam = uyari+kick+ban+jail;
        message.channel.send(embed.setDescription(`
    **Kullanıcı Bilgisi;**
    
    \`Kullanıcı Adı:\` **${member.user.tag}**
    \`ID:\` **${member.id}**
    \`Oluşturulma Tarihi:\` **${moment(member.user.createdAt).format("DD/MM/YY HH:mm:ss")}**

    **Sunucu İçi Bilgisi;**

    \`Rolleri:\` ${member.roles.cache.size > 8 ? `Çok fazla rolün mevcut (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
    \`Katılma Tarihi:\` **${moment(member.joinedAt).format("DD/MM/YY HH:mm:ss")}**  
 
 **Attığı Cezaların Sayısı**
  **Toplam:** \`${toplam}\` ( \`${uyari}\` **Uyarı**,\`${jail}\` **Jail**, \`${ban}\` **Ban**)
 
    
    `));
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["info"],
  permLevel: 0
};

exports.help = {
  name: "bilgi",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
};

exports.help = {
  name: "i"
};

