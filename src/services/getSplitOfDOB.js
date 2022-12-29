
exports.getSplitOfDOB = ({ birthdayDate }) => {
    // split the birthday string
    const splitDate = birthdayDate.split('-');

    // create new obj for dob
    return {
        year: splitDate[0],
        month: splitDate[1],
        date: splitDate[2],
    };
}