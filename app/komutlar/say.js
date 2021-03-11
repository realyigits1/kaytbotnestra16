const db = require('quick.db');
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
          var taglı = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes("ֆ")).size;
          var toplamüye = message.guild.memberCount
          var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
          var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
          var boost = message.guild.premiumSubscriptionCount
          var boostlevel = message.guild.premiumTier
          var erkek  = message.guild.members.cache.filter(b => b.roles.cache.get("813747008485326858")).size;
          var kız  = message.guild.members.cache.filter(b => b.roles.cache.get("813747011596845056")).size;


          const embed = new MessageEmbed()
              .setColor('#2F3136')
              .setDescription(`
• Sunucumuzda şuanda toplam \`${toplamüye}\` kişi bulunmakta.
• Sunucumuzda şuan aktif \`${online}\` üye bulunmakta.
• Tagımızda toplam \`${taglı}\` kişi bulunmakta.
• Sunucumuzda toplam \`${boost}\` boost bulunmakta.(${boostlevel}. seviye)
• Sesli sohbetlerde toplam \`${Sesli}\` kişi bulunmakta
• Bayan Olarak toplam \`${kız}\` kişi bulunmakta.
• Erkek Olarak toplam \`${erkek}\` kişi bulunmakta.`)
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
          message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["say"],
    permLevel: 0
};
exports.help = {
    name: "say",
    description: "Gelişmiş say komutu",
};