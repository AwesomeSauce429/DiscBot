const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;
    
        const Loger = new WebhookClient({
            id: "980714930946863114",
            token: "fFJBNentDsAqI8-gp8TTu3NtIq6l6H-XROJzXpBc8wX3nt9EpTW26kjHUn_e5-xBv7GL"
        });

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} has left the community\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter(`ID: ${user.id}`)

        Loger.send({embeds: [Welcome]})
    }
}