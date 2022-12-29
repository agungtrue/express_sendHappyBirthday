const User = require('../models/userModel'); // model init
const httpStatus = require('http-status');
const moment = require('moment-timezone');
const { getSplitOfDOB } = require('../services/getSplitOfDOB');

exports.createOne = async (req, res, next) => {
    try {
        // split the birthday string
        const dobObj = getSplitOfDOB(req.body);

        // merging the obj and save
        const newUser = await User.create({...req.body, dob_obj: dobObj});
    
        res.status(httpStatus.CREATED).json({ 
            status: 'CREATED', 
            data: newUser,
        });
    } catch (err) {
        console.error({ err });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            status: 'INTERNAL_SERVER_ERROR',
            message: err.message || 'Something went wrong!',
        });
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(httpStatus.OK).json({ 
            status: 'OK',
            total: users.length,
            data: users,
        });
    } catch (err) {
        console.error({ err });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'INTERNAL_SERVER_ERROR',
            message: err.message || 'Something went wrong!',
        });
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;

        // split the birthday string
        const dobObj = getSplitOfDOB(body);

        // get value for dobObj and update the record
        const user = await User.findByIdAndUpdate(id, {...body, dob_obj: dobObj}, {
            new: true,
            runValidators: true
        });

        // catch NOT_FOUND
        if(!user) return res.status(httpStatus.NOT_FOUND).json({ status: 'NOT_FOUND', data: null })

        res.status(httpStatus.OK).json({ 
            status: 'OK',
            message: 'successfully update user',
            user,
        });
    } catch (err) {
        console.error({ err });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'INTERNAL_SERVER_ERROR',
            message: err.message || 'Something went wrong!',
        });
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);

        // catch NOT_FOUND
        if(!user) return res.status(httpStatus.NOT_FOUND).json({ status: 'NOT_FOUND', message: 'user not found!' })

        res.status(httpStatus.OK).json({
            status: 'OK',
            message: 'successfully deleted!'
        });
    } catch (err) {
        console.error({ err });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: err.message || 'Something went wrong!',
        });
    }
}

exports.hasUserBirthday = async () => {
    try {
         // get date
         const now = moment().format();
         const dateString = now.split('T')[0]; // split to get proper value
        
         const birthdayMonthToday = dateString.split('-')[1];
         const birthdayDateToday = dateString.split('-')[2];
        
         // query based on month and date === today
         const userBirthday = await User.find({
             ['$and']: [
                 { 'dob_obj.month': birthdayMonthToday },
                 { 'dob_obj.date': birthdayDateToday },
             ],
         });

         // send the data to requester
         if (userBirthday.length) return userBirthday;

         return [];

    } catch (err) {
        console.error({ err: err.message });
    }
}