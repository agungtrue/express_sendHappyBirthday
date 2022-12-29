const fetch = require('node-fetch');
const { createOne } = require('../controllers/emailLogController');

exports.sendEmail = async ({user, emailBody, messageEvent}) => {
    const {
        firstName,
        lastName,
    } = user;

    let body = {
        email: "test@digitalenvision.com.au",
        message: `Hi ${firstName.toUpperCase()} ${lastName.toUpperCase()}, ${messageEvent}`
    }

    // override body if we want to reuse existing user emailBody
    if (emailBody) body = emailBody;

    try {
        const request = await fetch('https://email-service.digitalenvision.com.au/send-email', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });

        const response = await request.json();
        console.info({ response })

        // log response from email services
        return await createOne({
            user,
            emailBody: body,
            emailResponse: response,
        });

    } catch (err) {
        console.error(err);

        // log response from email services
        await createOne({
            user,
            emailBody: body,
            emailResponse: err,
        });
    }
}