const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const database = require("croxydb");
const moment = require("moment");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const message = require("./events/message");
require("./Util/eventLoader")(client);
const queue = new Map();

var prefix = config.prefix;

const log = message => {
  console.log(`${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`[${files.length}] Tane Komut Yükleniyor...`);
  files.forEach(f => {
    moment.locale("tr") 
    let tarih = moment().format('LL');
    let saat = moment().add('hours').format("LT");
    let props = require(`./commands/${f}`);
  log(`[${tarih}] - [${saat}] | Yüklenen Komut | [${props.help.name}]`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === config.developer) permlvl = 4;
  return permlvl;
};

client.on("ready", () => {
console.log(`${client.user.username} bot online!`)
})






client.on("ready", async () => {
  setInterval(() => {
  client.guilds.cache.map(m => {
  m.members.cache.map(mr => {
  let csd = database.get(`voicemute.${mr.id}`);
  if (csd) {
  let time = Date.now() - csd.vmutezaman;
  let sure = csd.vmutesüre;
  let csm = m.members.cache.get(csd.vmuteyiyen);
  let logs = client.channels.cache.get("800354747172782090")
 
  if (time >= sure) {
  database.delete(`voicemute.${mr.id}`);
  logs.send(new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(`${csm} kullanıcının sesli susturulması otomatik olarak kaldırıldı.`)
  .setColor("AQUA"));
  mr.voice.setMute(false);
  } else {
  mr.voice.setMute(true);
  }
  }
  });
  });
  }, 6000);
  });
 
  ///CHAT MUTE//
  client.on("ready", async () => {
  setInterval(() => {
  client.guilds.cache.map(m => {
  m.members.cache.map(mr => {
  let muterol = m.roles.cache.get("776825445554978837")
  let csd = database.get(`chatmute.${mr.id}`);
  if (csd) {
  let time = Date.now() - csd.cmutezaman;
  let sure = csd.cmutesüre;
  let csm = m.members.cache.get(csd.cmuteyiyen);
  let logs = client.channels.cache.get("800354747172782090")
   
  if (time >= sure) {
  database.delete(`chatmute.${mr.id}`);
  logs.send(new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(`${csm} kullanıcının metin kanallarındaki susturulması otomatik olarak kaldırıldı.`)
  .setColor("AQUA"));
  mr.roles.remove(muterol)
  } else {
  mr.roles.add(muterol)
  }
  }
  });
  });
  }, 6000);
  });



  client.on("ready", async function() {
    const voiceChannel = "775093177702547497"
    client.channels.cache.get(voiceChannel).join()
    .catch(err => {
    throw err;
    })
    })



    
   
const iltifatlar = [
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
"Yaşanılacak en güzel mevsim sensin.",
  "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
  "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
  "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
  "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
  "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
  "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "Bir gamzen var sanki cennette bir çukur.",
  "Gecemi aydınlatan yıldızımsın.",
  "Ponçik burnundan ısırırım seni",
  "Bu dünyanın 8. harikası olma ihtimalin?",
  "fıstık naber?",
  "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
  "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
  "Müsaitsen aklım bu gece sende kalacak.",
  "Gemim olsa ne yazar liman sen olmadıktan sonra...",
  "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
  "Sabahları görmek istediğim ilk şey sensin.",
  "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
  "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
  "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
  "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
  "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
  "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
  "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
  "Gülüşün ne güzel öyle- CUMHURİYETİN gelişi gibi...",
  "Arkandan sevdim seni, hiç kalbin sızladı mı?",
  "Elinden geliyorsa azıcık sevsene beni.",
  "Sen bir sorusun, cevabın içinde saklı.",
"Kadınların özelliği ne biliyor musun? Seni sen yapan özelliklere âşık olup, senden o özellikleri almaya çalışmak.",
  "Dünyada iki kör tanıdım.. Biri beni görmeyen sen.. Biri senden başkasını görmeyen ben..",
  "Yanımda bir kişilik yer var. Ama ne yazık ki o kişilik sende yok.",
  "Umursamıyorum çünkü sen benimsin",
  "Sarılma ihtiyacı duyuyorum ama hep sana tek sana...",
  "Bir gün herkes gibi olmadığımı anlayacaksın. işte o gün sen. herkes gibi olacaksın...",
  "Bir seni sevdim birde seni sevmeyi sevdim",
  "Melekleri kıskandıran güzelliğinden bir tas doldur da ver, içeyim. Serinlesin gönlüm. Meleklere sesleneyim siz gökyüzünün, bu kadın yeryüzünün *MELEĞİ* diye.",
  "O kadar Güzel Gülüyorsun ki Bütün Acılarımı Unutuyorum",
  "Sana sarılmak gibi bir dünya harikası var.",
  "Benim en güzel zaafım sensin aşkım.",
  "Seninle yuva kurmak tek hayalim, ellerini tutarak ömrümü bitirmek tek isteğim.",
  "Kokun yokken nefes almak zehir gibi geliyor",
  "Bir romanın içindeki altı çizili kelime gibisin kendimi bulduğum.",
  "Hayallerim bile yetmiyor senli anlarıma.",
  "Gözüm görmese bile kalbim bulur seni.",
  "Gözlerin gönlüme en yakın liman bense o limandaki tek adam.",
  "Sen benim gözümün daldığı, yüreğimin aşkla yandığısın. Nerede olursa ol sen bende candan fazlasın.",
  "Dünyan kararsa bile gözlerimle aydınlatırım hayatını.",
  "Öyle güzel dalıp gidiyorsun ki daldığın yerde olmak isterdim.",
  "Küçük kalbimde kocaman bir yere sahipsin.",
  "Gözlerine bakınca geleceğimi görebiliyorum.",
  "Seni sevmek sevap ise her gün sevmeye razıyım.",
  "Sen acılarımın arasında yeşeren en güzel şifasın benim için.",
  "Yürüdüğün yol olmak isterim ayağın taşa değmesin diye sakınırım.",
  "Sana bakarken gözlerimin için titriyor canımın içi.",
  "Kendimi sende bulduğum için bu kadar güzelsin.",

];
client.on("message", async message => {
  if(message.channel.id !== "775093206576005152") return;
  let emin = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(emin >= 100) {
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
    message.reply(`**${(iltifatlar)[random]}**`);
  };
});


client.on("guildMemberAdd", member => {
  member.roles.add('796794605840105484'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

client.on("guildMemberAdd", member => {
  member.roles.add('796777726878023690'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

client.on("guildMemberAdd", member => {  
  const emin = new Discord.WebhookClient("800658236666806322", "4__4tTPSqBJqVKVVQYHbymW7JaZRIYxXDSNUKdSWsvUGgmHQsiJgysu4AHLD0-hSJbCj")
  const kanal = member.guild.channels.cache.find(r => r.id === "800354568633319445");
    
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = '<a:kaos_iptal:773574711698391060>'
  if (kurulus > 1296000000) kontrol = '<a:kaos_onay1:773574751552929813>'
  moment.locale("tr");
  emin.send("<a:kaos_gul:768770935314317323> **Sunucumuza Hoş Geldin ! <@" + member + "> \n\n <a:kaos_gul:768770935314317323> Hesabın "+ gecen +" Önce Oluşturulmuş "+kontrol+"  \n\n <a:kaos_gul:768770935314317323> Seninle beraber " + member.guild.memberCount + " kişi olduk ! Tagımızı alarak bizlere destek olabilirsin !  ! İyi eğlenceler.**")
  });


  client.on("userUpdate", async (oldUser, newUser) => {

    if (oldUser.username !== newUser.username) {
       
     let tag = "ᵏᵃᵒˢ"           // taginiz
        
    let sunucu = "761883834265632778"    //sunucu id niz
        
    let kanal = "800354797701562399"        //log kanalı  orda mesaj atıcak
        
    let rol = "777599397172609064"            //tag alınınca verilcek rol
    let embed = new Discord.MessageEmbed()
    .setDescription(`
    ${newUser} "${tag}" tagını aldığı için <@&777599397172609064> rolünü kazandı!
    `)
    let embed2 = new Discord.MessageEmbed()
    .setDescription(`
    ${newUser} "${tag}" tagını çıkardığı için <@&777599397172609064> rolünü kaybetti!
    `)
    if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
          client.channels.cache.get(kanal).send(embed)
          client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
        } if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
          client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
          client.channels.cache.get(kanal).send(embed2)
    }
    }
    });






client.on("message", msg => {
 if(!database.has(`reklam_${msg.guild.id}`)) return;
        const reklam = ["discord.gg", "discordapp.com", ".me", ".gg", ".cf", ".tk", ".net", "youtube.com", ".com", ".club", ".xyz", ".network", ".ooo", ".host", ".com.tr", ".gov", ".org", ".info", ".biz", ".online", ".live", ".cloud", "https", "http", "https://", "http://", "www.", ".ml", ".pw", ".ga", "linktl", "link.tl", "trlink", "tr.link", "goo.gl", ".cc", ".gl", ".ws", ".art", ".cc", ".co.nf", ".tr.tc", "eu.tc", ".co", ".inf", "mc.tc", ".hosting", ".hoisting", ".store", ".tech", ".site", ".website", ".biz", ".co", ".space"];
  const reklamsızlar = ["tenor", "giphy", ".png", ".gif"]   
if(msg.guild.owner.id === msg.member.id) return;
if(msg.member.roles.cache.has(database.fetch(`dokunulmaz.${msg.guild.id}`))) return;


  if (reklam.some(word => msg.content.includes(word)) ) {
      if (!reklamsızlar.some(word => msg.content.toLowerCase().includes(word)) ) {

    try {
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                  msg.delete();
                    return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Reklam Yapamazsın❕.`).setColor('RANDOM').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
            }
           }
 }
  });
client.on("messageUpdate", msg => {
 if(!database.has(`reklam_${msg.guild.id}`)) return;
        const reklam = ["discord.gg", "discordapp.com", ".me", ".gg", ".cf", ".tk", ".net", "youtube.com", ".com", ".club", ".xyz", ".network", ".ooo", ".host", ".com.tr", ".gov", ".org", ".info", ".biz", ".online", ".live", ".cloud", "https", "http", "https://", "http://", "www.", ".ml", ".pw", ".ga", "linktl", "link.tl", "trlink", "tr.link", "goo.gl", ".cc", ".gl", ".ws", ".art", ".cc", ".co.nf", ".tr.tc", "eu.tc", ".co", ".inf", "mc.tc", ".hosting", ".hoisting", ".store", ".tech", ".site", ".website", ".biz", ".co", ".space"];
  const reklamsızlar = ["tenor", "giphy", ".png", ".gif"]   
if(msg.guild.owner.id === msg.member.id) return;
if(msg.member.roles.cache.has(database.fetch(`dokunulmaz.${msg.guild.id}`))) return;


  if (reklam.some(word => msg.content.includes(word)) ) {
      if (!reklamsızlar.some(word => msg.content.toLowerCase().includes(word)) ) {

    try {
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                  msg.delete();
                    return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Reklam Yapamazsın❕.`).setColor('RANDOM').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
            }
           }
 }
  });


const db = require('quick.db');//

client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(config.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`)).then(x => x.delete({timeout: 5000}));
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`)).then(x => x.delete({timeout: 5000}));
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});


client.on("message", message => {
  if(message.content.toLowerCase() == "!tag") 
  return message.channel.send(`ᵏᵃᵒˢ`)
});

client.on("message", message => {
  if(message.content.toLowerCase() == "-tag") 
  return message.channel.send(`ᵏᵃᵒˢ`)
});



client.on("message", message => {
  if(message.content.toLowerCase() == "tag") 
  return message.channel.send(`ᵏᵃᵒˢ`)
});


client.on("message", message => {
  if(message.content.toLowerCase() == ".tag") 
  return message.channel.send(`ᵏᵃᵒˢ`)
});

//------------------------------------------------------------------------------------------------------------\\




client.on("message", message => {
if(message.content.toLowerCase() == "!davet") 
return message.channel.send(`${message.author} discord.gg/kaos`)
});









client.login(config.token);