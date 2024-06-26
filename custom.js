const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load configuration
const configPath = path.resolve(__dirname, './config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

function sendHourlyMessage(api, messages) {
    setInterval(() => {
        api.getThreadList(100, null, ["PENDING"], (err, list) => {
            if (err) {
                console.error('Error fetching thread list:', err);
                return;
            }
            list.forEach(thread => {
                const randomIndex = Math.floor(Math.random() * messages.length);
                api.sendMessage(messages[randomIndex], thread.threadID, (err) => {
                    if (err) {
                        console.error(`Error sending hourly message to thread ${thread.threadID}:`, err);
                    } else {
                        console.log(`Hourly message sent to thread ${thread.threadID}`);
                    }
                });
            });
        });
    }, 15 * 60 * 1000); // loop every 29 minutes
}

function init(api) {
    const messages = [
        "Thank you for using my bot! More commands coming soon. Stay tuned!",
        "Did you know? You can use my bot to automate many tasks!",
        "Stay safe and take care Everyone!",
        "Remember to take breaks and eat on time!",
        "Have a great and nice day!",
        "Goodmorning, Goodafternoon, Goodevening, and Goodnight.",
        "Follow this bot Please. Your support means a lot to us!",
        `Need help? Type ${config.PREFIX}help for a list of commands.`,
        "Stay positive and keep moving forward!",
        "How's your day today?^^"
    ];
    sendHourlyMessage(api, messages);
}

module.exports = {
    init
};
