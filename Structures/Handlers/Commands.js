const { Perms } = require("../Validation/Permissions");


/**
 * @param {Client} client
 */

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "🟥 FAILED", "Missing a name.")

        if(!command.type && !command.description)
        return Table.addRow(command.name, "🟥 FAILED", "Missing description")

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name, "🟥 FAILED"," Permission is invalid")
        }
        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "🟩 SUCCESSFUL");

    });

    console.log(Table.toString());

    client.on("ready", async () => {
        const MainGuild = await client.guilds.cache.get("725133498293420073");

        MainGuild.commands.set(CommandsArray)
        client.on('ready', async () => {
            const mainGuild = await client.guilds.cache.get("725133498293420073");
            mainGuild.commands.set(CommandsArray);
        });
    });
}