const axios = require('axios');

module.exports = {
    description: "Talk to sim",
    octoPrefix: false,
    role: "user",
    cooldown: 1,
    execute: async function(api, event, args, commands) {
        let { messageID, threadID, senderID, body } = event;
        let tid = threadID,
            mid = messageID;
        const content = encodeURIComponent(args.join(" "));
        if (!args[0]) {
            return api.sendMessage("Please type a message...", tid, mid);
        }
        try {
            const res = await axios.get(`https://sim-api-ctqz.onrender.com/sim?query=${content}`);
            if (res.data.error) {
                api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                    if (error) {
                        console.error(error);
                    }
                }, mid);
            } else {
                const response = res.data.respond;
                api.sendMessage(response, tid, (error, info) => {
                    if (error) {
                        console.error(error);
                    }
                }, mid);
            }
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching the data.", tid, mid);
        }
    }
};
