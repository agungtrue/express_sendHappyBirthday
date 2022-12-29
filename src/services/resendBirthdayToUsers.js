const moment = require('moment-timezone');
const nodeCron = require('node-cron');
const { updateFailedSendEmail } = require('../controllers/emailLogController');
const { sendEmail } = require('./emailServices');

module.exports = resendBirthdayToUsers = ({
    emailLog,
    messageEvent,
    second,
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek,
}) => {
    console.info(
        'resendBirthdayToUsers args...',
        `${second || '0'} ${minute || '0'} ${hour || '*'} ${dayOfMonth || '*'} ${month || '*'} ${dayOfWeek || '*'}`
    );

    // start cron
    nodeCron.schedule(
        `${second || '0'} ${minute || '0'} ${hour || '*'} ${dayOfMonth || '*'} ${month || '*'} ${dayOfWeek || '*'}`,
    async () => {
        try {
            console.info('start query getFailedSendEmail...');
            console.info({ emailLog });
    
            // send back email with those data selected
            // const sendBack = await sendEmail(emailLog.user, emailLog.emailBody);
            const sendBack = await sendEmail({user: emailLog.user, emailBody: emailLog.emailBody, messageEvent});


            // remove existing data that already label as failed into send
            //  since in sendEmail() function, we create new record for log
            if (sendBack) await updateFailedSendEmail(emailLog);
            console.info({ sendBack })
        } catch (err) {
            console.error({ err: err.message });
        }
    },
    { scheduled: true, timezone: emailLog.user.location } // this is based on user timezone
    );
}