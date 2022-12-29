const { make } = require('simple-body-validator');
const httpStatus = require('http-status');

exports.createOne = (req, res, next) => {
    const payload = req.body;

    // basic rules
    const rules = {
        firstName: 'required|string|min:3',
        lastName: 'required|min:3',
        birthdayDate: 'required|string',
        location: 'required|string',
    };

    // other logic

    // using simple-body-validator
    const validator = make(payload, rules);

    if (!validator.validate()) {
        return res.status(httpStatus.BAD_REQUEST).json({
            status: "BAD_REQUEST",
            errors: validator.errors().all(),
        });
    };

    next();
};
