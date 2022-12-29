const moment = require('moment-timezone');

exports.getDateByTimeZone = (date, timeZone) => {
    const time = moment.utc(date).tz(timeZone).format();
    return time;
}

