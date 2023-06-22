const cron = require("node-cron");
const User = require("../models/User")
const { dailyMail } = require("../config/nodemailer.config");


const scheduledEmail = async () => {
    // cronjob
    cron.schedule("* * 15 * *", async function () {
        const users = await User.find().exec();
        console.log("---------------------");
        console.log("running a task every 15 seconds");
        users.forEach((user) => dailyMail(user.email,user.firstName))
    });
    
}

module.exports = scheduledEmail