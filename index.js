const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
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

//Hay que poner el token que te da discord
client.login('token');

client.on('message', async message => {
    //console.log(message.content);

    //Si dices ping responde pong!
    if (message.content === 'ping') {
        message.reply('Pong!');
    }

    //Devuelve el saludo
    if (message.content === 'Hola') {
        message.channel.send(`Hola, ${message.author}`);
    }


    //Da info inútil
    if (message.content === '!chickles') {
        message.channel.send('https://info.mercadona.es/es/consejos/alimentacion/chicles-con-100-xilitol-complementa-tu-cuidado-dental/tip');
    }

    //Cuenta un chiste
    if (message.content === '!joke') {
        chiste(message);
    }

    //Simplemente para testear
    if (message.content.startsWith('!test')) {
        message.channel.send('Respuesta test');
    }

    //Para probar la edición de mensajes
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

    //Borra los mensajes del chat
    if (message.content === '!clear') {

        try {
            const fetched = await message.channel.messages.fetch();
            message.channel.bulkDelete(fetched);
            message.channel.send("Borrados todos los mensajes");
        } catch (err) {
            message.channel.send("No se pudieron borrar los mensajes");
            console.log(err);
        }

    }

});

//Coge un chiste random de la API y lo envía
async function chiste(msg) {
    const { joke } = await fetch('https://sv443.net/jokeapi/v2/joke/Any?type=single').then(response => response.json());
    msg.channel.send(joke);
}
