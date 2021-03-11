const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
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
            let cmd = require(`./komutlar/${command}`);
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
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
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
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     
let kayıtsız = ayarlar.kayıtsızROL

client.on("guildMemberAdd", member => {
  member.roles.add(kayıtsız);
});
//-----------------------GİRENE-ROL-VERME SON----------------------\\     


//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     

////////////////////////////////////////////////////////////////////////////////


client.on("guildMemberAdd", member => {

   let aylartoplam = {
        "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs",
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",
        "09": "Eylül",
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
  }

 let aylar = aylartoplam 
    const kanal = member.guild.channels.cache.find(r => r.id === "815132921866223646");
    let user = client.users.cache.get(member.id);
  
    require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
  var kontrol;
  if (kurulus < 1296000000) kontrol = '<:ReddedilmiPng1:810875993970835476> Güvenilir Gözükmüyor'
  if (kurulus > 1296000000) kontrol = '<:OnaylanmPng1:810875993518243850> Hesap Güvenli.'
    moment.locale("tr");
    kanal.send(`
> **Nestra'ya Hoşgeldin <@`+ member + `> <
> 
> Hoşgeldin <@`+ member + `> Seninle ${member.guild.memberCount} Kişiyiz
> 
> Sunucuya Kayıt Olmak İçin Sol Taraftaki Register(ses teyit) Odalarına Girip Yetkiliyi Bekleyiniz
> 
> Yetkili(<@&813746984593915924>) İsimli Yetkililerimiz sizinle ilgilenecektir.
> 
> Hesabın Kurulduğu Tarih: ${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}
> 
> `+kontrol+`**`)});

  
//-----------------------HOŞ-GELDİN-MESAJI SON----------------------\\     


//-----------------------TAG-ROL-LOG----------------------\\  
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'ֆ'
  const sunucu = '810837170012815380'
  const log = '815134966353756200'
  const rol = '813761321933471754'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});
//-----------------------TAG-ROL-LOG-SON----------------------\\  

client.on("ready", () => {
  client.channels.cache.get("813747144460468254").join();
});

client.on('message', msg => {
    if (msg.content === '!tag') {
        msg.channel.send(`ֆ <a:tagal:818050843843493918>`); // tagı yazınız
    } else if (msg.content === 'n!tag') {
        msg.channel.send(`ֆ <a:tagal:818050843843493918>`);// tagı yazınız
    } else if (msg.content === '.tag') {
        msg.channel.send(`ֆ <a:tagal:818050843843493918>`);// tagı yazınız
    } else if (msg.content === ".rol-v2er") {
        msg.guild.members.cache.forEach(x => {
            x.roles.add("ֆ")
        })
    }
});


////////////////////////////////////////////////////////////////////////////////
client.on("message", msg => {
    if(!db.has(`reklam_${msg.guild.id}`)) return;
           const reklam = ["discord.gg/vanessa", ".com", ".net", ".tk", ".xyz", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
           if (reklam.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("BAN_MEMBERS")) {
                     msg.delete();
                       return msg.reply('Nestra | **Reklam Yapmayı Bırakmalısın** :warning:').then(msg=> msg.delete({timeout: 5000}))                          
    
               }              
             } catch(err) {
               console.log(err);
             }
           }
       });
  
////////////////////////////////////////////////////////////////////////////////