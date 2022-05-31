const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
       
        const { user, guild } = member;
        
        member.roles.add("980377415580803092");
        
        const Welcomer = new WebhookClient({
            id: "980714616852197436",
            token: "YlZj3moTQf6ZhjigpahX7JGHkC4zJIQYlta5fiIx8dST8yQHi5IJCY3sVJ0rKMtLNEjJ"
        });

        const Welcome = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome ${member} to the **${guild.name}**!\n
        Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter(`ID: ${user.id}`)

        Welcomer.send({embeds: [Welcome]})
    }
}