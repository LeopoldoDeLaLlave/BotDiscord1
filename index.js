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
client.login('Token');

client.on('message', message => {
    //console.log(message.content);

    //Si dices ping responde pong!
    if (message.content === 'ping') {
        message.reply('Pong!');
    }

    //Devuelve el saludo
    if (message.content === 'Hola') {
        message.channel.send(`Hola, ${message.author}`);
    }


    //Comparte link
    if (message.content === '!chickles') {
        message.channel.send('https://info.mercadona.es/es/consejos/alimentacion/chicles-con-100-xilitol-complementa-tu-cuidado-dental/tip');
    }

    //Cuenta un chiste
    if (message.content === '!joke') {
        chiste(message);
    }

    //Simplemente para testear
    if (message.content.startsWith('!info')) {
        message.channel.send('Esto es un bot de prueba');
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
        clear(message);
    }

});

//Coge un chiste random de la API y lo envía
async function chiste(msg) {
    const joke = await fetch('https://sv443.net/jokeapi/v2/joke/Any').then(response => response.json());
    //Los chistes pueden tener una o dos partes, por lo tanto le damos diferente comportamiento
    if (joke.type === "single") {
        msg.channel.send(joke.joke);
    } else {
        msg.channel.send(joke.setup);
        msg.channel.send(joke.delivery);
    }

}

//Borra los mensajes
async function clear(msg) {
    try {
        const fetched = await msg.channel.messages.fetch();
        msg.channel.bulkDelete(fetched);
        msg.channel.send("Borrados todos los mensajes");
    } catch (err) {
        msg.channel.send("No se pudieron borrar los mensajes");
        console.log(err);
    }
}
