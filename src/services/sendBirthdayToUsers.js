const moment = require('moment-timezone');
const nodeCron = require('node-cron');
const { hasUserBirthday } = require('../controllers/userController');
const { sendEmail } = require('./emailServices');

module.exports = sendBirthdayToUsers = ({
    user,
    messageEvent,
    second,
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek,
}) => {
    console.info(
        'args...',
        `${second || '0'} ${minute || '0'} ${hour || '*'} ${dayOfMonth || '*'} ${month || '*'} ${dayOfWeek || '*'}`,
        { user }
    );

    // snend to user with specific date based on user local time
    nodeCron.schedule(
        `${second || '0'} ${minute || '0'} ${hour || '*'} ${dayOfMonth || '*'} ${month || '*'} ${dayOfWeek || '*'}`,
    async () => {
        try {
            console.info('________________________________________________________________________');
            console.info('start send to user...');
            
            // send email
            await sendEmail({ user, messageEvent });

        } catch (err) {
            console.error({ err: err.message });
        }
    },
    { scheduled: true, timezone: user.location } // this is based on user timezone
    );
}