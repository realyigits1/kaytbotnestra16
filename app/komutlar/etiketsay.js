const Discord = require('discord.js')

exports.run = async (client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Merhaba');
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(embed.setDescription("Bu Komut İçin Yetkin Bulunmuyor.")).then(x => x.delete({ timeout: 3000 }))
        }
        let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has('813746984593915924')).filter(s => !s.voice.channel).map(s => s).join('\n')
        message.channel.send(`${sesteolmayan} \n  <:TamirPng:810875994583203860> Merhabalar sunucumuzun ses aktifliğini arttırmak için lütfen müsait isen public odalara değil isen alone odalarına geçer misin? <a:donenlogo:818048722667438101>`)
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["etiketsay"],
    permLevel: 0
};
exports.help = {
    name: "etiketsay",
    description: "Belirtilen Etikette Kaç Kişi Olduğunu Gösterir",
};