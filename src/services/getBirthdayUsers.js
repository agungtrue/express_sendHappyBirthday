const nodeCron = require('node-cron');
const { getNameOfMonth } = require('./getNameOfMonth');
const { getSplitOfDOB } = require('./getSplitOfDOB');
const sendBirthdayToUsers = require('./sendBirthdayToUsers');
const { hasUserBirthday } = require('../controllers/userController');

module.exports = getBirthdayUsers = ({ messageEvent }) => {
    // send email cron node start/active
    const task = nodeCron.schedule("* * * * * *", async () => {
        try {
            const whoseBirthdayToday = await hasUserBirthday(); // get userBirthday

            // if exist then send the email
            if (whoseBirthdayToday?.length) {
                console.info({ whoseBirthdayToday });

                whoseBirthdayToday.forEach((user) => {
                    const userBirthMonth = getNameOfMonth(user.birthdayDate);
                    const { date: userBirthDate } = getSplitOfDOB(user);

                    // args for user schedule
                    const userScheduledBirth = {
                        minute: '0',
                        hour: '9',
                        dayOfMonth: userBirthDate,
                        month: userBirthMonth,
                        user,
                        messageEvent,
                    }

                    // send email to users
                    sendBirthdayToUsers(userScheduledBirth);
                });
            }
            
            // stop cron
            stopCronSchedule();

        } catch (err) {
            console.error({ err: err.message });
            stopCronSchedule();
        }
    });
    
    // stop the cron services
    const stopCronSchedule = () => task.stop();
};