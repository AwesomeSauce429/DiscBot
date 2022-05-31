const { Client, Collection } = require('discord.js');
const client = new Client({intents : 131071});
const { Token } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");


client.buttons = new Collection();
client.commands = new Collection();

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()]
});
module.exports = client;

["GiveawaySys"].forEach((system) => {
    require(`../Systems/${system}`)(client);
  });

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
})

client.login(Token);

