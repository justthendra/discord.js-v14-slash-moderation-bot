const { ActivityType, Events } = require('discord.js');
const config = require('../config.json')
const mongoose = require('mongoose');
require('cute-logs')

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {

        client.user.setStatus(config.bot.presence.status);
        client.user.setPresence({
            activities: [{
                name: config.bot.presence.text,
                type: ActivityType.Listening
            }]
        })

        mongoose.set("strictQuery", false);
        mongoose.connect(config.bot.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.success("MongoDB bağlantısı başarılı.", "MongoDB");
        }).catch(err => {
            console.error("MongoDB bağlantısı başarısız: " + err, 'MongoDB');
        });
        

        console.success(client.user.username + " hazır!", "Bot");
    }
}