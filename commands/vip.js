const Discord = require("discord.js")
const ayar = require("../config.json");
module.exports.run= async(client, message, args) => {

const rol = "775093113844531270" 

if(!["799957166915059733","795705527010983936","775093078422847518","775093080986353673"].some(role => message.member.roles.cache.get(role)) && !message.member.roles.cache.has(ayar.sahipRolu) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("Bu komutu kullanabilmek için gerekli rollere sahip değilsin!").then(x => x.delete({timeout: 5000}));

let eminbne 
let selinay = message.mentions.members.first()
let emin = message.guild.members.cache.get(args[0])
if(selinay){
eminbne = selinay
}
if(emin){
eminbne = emin
}
if(!emin && !selinay){
message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setFooter("Emin ❤️ Kaos").setDescription("Kişi Etiketle Veya İD Gir Örnek: .vip @EminBneCnms#0044 "))
}
eminbne.roles.add(rol)
 message.react("773574751552929813")
}
module.exports.conf = {
aliases: ["vip"]
}

module.exports.help = {
name: "vipver"
}