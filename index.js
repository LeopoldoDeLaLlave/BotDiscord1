const Discord = require('discord.js');
const client = new Discord.Client();
var testCha = null;

client.on('ready', () => {
    console.log(`Bot is ready as ${client.user.tag}`);
    //Cambiamos el estado del bot
    client.user.setStatus('dnd');
    //Mostramos el estado del bot
    console.log(client.user.presence.status);
    //Guardamos un canal concreto por si el bot está en varios canales

    /*client.channels.fetch('749700359370309724')
        .then(channel => {
            testCha = channel;
            console.log(testCha.name);
        });*/


});

client.login('NzQ5NzAwNjg0MDc2ODEwMzUw.X0vzKw.DVW3DUvfUVbYF8Q2BZeJLw2EtW0');

client.on('message', async message => {
    console.log(message.content);
    if (message.content === 'ping') {
        message.reply('Pong!');
    }
    if (message.content === 'Hola') {
        message.channel.send(`Hola, ${msg.author}`);
    }



    if (message.content === '!chickles') {
        message.channel.send('https://info.mercadona.es/es/consejos/alimentacion/chicles-con-100-xilitol-complementa-tu-cuidado-dental/tip');
    }

    if (message.content.startsWith('!test')) {
        message.channel.send('Respuesta test');
    }

    if (message.content === '!pretty') {
        const embed = new Discord.MessageEmbed()
            // Set the title of the field
            .setTitle('Mira que bonito')
            // Set the color of the embed
            .setColor('#34ebcf').
            setAuthor("chickles", "https://e7.pngegg.com/pngimages/370/110/png-clipart-chewing-gum-bubble-gum-candy-chewing-gum-orbit-bubble-gum.png")
            // Set the main content of the embed
            .setDescription('Está bonito en verdad');
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }

    if (message.content === '!clear') {
       const fetched = await message.channel.messages.fetch({limit: 100});
       message.channel.bulkDelete(fetched);
       console.log("mensajes borrados");
    }

});
