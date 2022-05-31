const client = require("../../Structures/index");
const { MessageEmbed } = require("discord.js");



client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    const prefix = config.prefix
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
      return message.channel.send(` | You must be in a voice channel!`)
    }
    try {
      cmd.run(client, message, args)
    } catch (e) {
      console.error(e)
      message.channel.send(` | Error: \`${e}\``)
    }
  })
  
  const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
      queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
  client.distube
    .on('playSong', (queue, song) =>
      queue.textChannel.send(
        ` | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
          song.user
        }\n${status(queue)}`
      )
    )
    .on('addSong', (queue, song) =>
      queue.textChannel.send(
        ` | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
      )
    )
    .on('addList', (queue, playlist) =>
      queue.textChannel.send(
        ` | Added \`${playlist.name}\` playlist (${
          playlist.songs.length
        } songs) to queue\n${status(queue)}`
      )
    )
    .on('error', (channel, e) => {
      channel.send(` | An error encountered: ${e.toString().slice(0, 1974)}`)
      console.error(e)
    })
    .on('empty', queue => queue.textChannel.send('Voice channel is empty! Leaving the channel...'))
    .on('searchNoResult', (message, query) =>
      message.channel.send(` | No result found for \`${query}\`!`)
    )
    .on('finish', queue => queue.textChannel.send('Finished!'))

    module.exports = {
      name: "DistubeEvents",
    }