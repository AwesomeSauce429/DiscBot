const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message 
     */
    execute(message) {
        if(message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📕 A [message](${message.url}) by ${message.author.tag} was **deleted**.\n
        **Deleted Message:**\n ${message.content ? message.content : "None"}`.slice(0, 4096))
        
        if(message.attachments.size >= 1){
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        }
        
        new WebhookClient({url: "https://discord.com/api/webhooks/980715622822453278/TKuV3HfGxqt766TmKr52krawmnJ5QL2sUu3qfhl6QYGAama7lp7tGqX-EFbELELL02mN"}
        ).send({embeds: [Log]}).catch((err) => { console.log(err)});

    }
}