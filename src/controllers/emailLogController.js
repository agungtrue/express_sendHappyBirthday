const EmailLog = require('../models/emailLogModel'); // model init
const httpStatus = require('http-status');

exports.createOne = async (body) => {
    try {
        const log = await EmailLog.create(body);
        return log;
    } catch (err) {
        console.error({ err });
        return null;
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const logs = await EmailLog.find({
            'emailResponse.status': { $exists: true },
            emailBody: { $exists: true },
        });
        res.status(httpStatus.OK).json({ 
            status: 'OK',
            total: logs.length,
            data: logs,
        });
    } catch (err) {
        console.error({ err });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'INTERNAL_SERVER_ERROR',
            message: err.message || 'Something went wrong!',
        });
    }
}

exports.getFailedSendEmail = async (req, res, next) => {
    try {
        // we expect that there is no success email in that query
        const log = await EmailLog.find({
            'emailResponse.status': { $exists: false },
            emailBody: { $exists: true },
        });

        // json data for validating from client or postman
        if (req?.query?.json) {
            return res.status(httpStatus.OK).json({
                total: log.length,
                data: log,
            });
        }

        // send the data to requester
        if (log.length) return log;

        return [];
    } catch (err) {
        console.error({ err });
        return null;
    }
}

exports.updateFailedSendEmail = async ({_id}) => {
    try {
        // actually we decide to remove existing data,
        // since if email send successfully, wen create new record for log
        await EmailLog.findByIdAndDelete(_id);
    } catch (err) {
        console.error({ err });
    }
}