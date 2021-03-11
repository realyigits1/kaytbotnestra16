const Discord = require('discord.js');
const rdb = require('quick.db');
const moment = require('moment');
exports.run = async (client, message, args) => {
let kayitcial = '813746984593915924' 
if(!["816414327644094504"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`).then(x => x.delete({timeout: 5000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
 member.roles.add(kayitcial)
  let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`${member} kişisi artık ${kayitcial}! .`)
  .setTimestamp()
message.react(client.emojiler.onay).catch();
message.channel.send(embed).then(x => x.delete({timeout: 5000}));
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kayıtçı-al'],
  permLevel: 0
}
exports.help = {
  name: 'kayitci',
  description: "Belirtilen üyeye kayıtsız rolü verir",
  usage: 'kayitci @kişi'
}

//////////////////  H  A  T  A    O  L  A  B  İ  L  İ  R ////////kayitcial kismi///////////////