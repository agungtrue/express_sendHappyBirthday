const nodeCron = require('node-cron');
const moment = require('moment-timezone');
const { getDateByTimeZone } = require('./getDateByTimeZone');
const { getNameOfMonth } = require('./getNameOfMonth');
const { getSplitOfDOB } = require('./getSplitOfDOB');
const sendBirthdayToUsers = require('./sendBirthdayToUsers');
const resendBirthdayToUsers = require('./resendBirthdayToUsers');
const { hasUserBirthday } = require('../controllers/userController');
const { getFailedSendEmail } = require('../controllers/emailLogController');

module.exports = getFailedSendBirthdayUsers = ({ messageEvent }) => {
    // send back email cron node start/active
    const task = nodeCron.schedule("* * * * * *", async () => {
        try {
            // get email log data that was failed before
            const failedSendEmail = await getFailedSendEmail();

            failedSendEmail.forEach(async (emailLog) => {

                // grab user obj
                const { user } = emailLog;

                // get proper value for schedule args
                const userBirthMonth = getNameOfMonth(user.birthdayDate);
                const { date: userBirthDate } = getSplitOfDOB(user);

                // args for user schedule
                const userScheduledBirth = {
                    minute: '0',
                    hour: '9',
                    dayOfMonth: String(Number(userBirthDate) + 1), // next day
                    month: userBirthMonth,
                    emailLog,
                    messageEvent
                }

                // resend email that have failed status
                resendBirthdayToUsers(userScheduledBirth);
            });

            stopCronSchedule();
            
        } catch (err) {
            console.error({ err: err.message });
            stopCronSchedule();
        }
    });
    
    const stopCronSchedule = () => task.stop();
};