const User = require('../models/user');
const Exercise = require('../models/excercise');
const moment = require('moment');


exports.createUser = async (req, res, next) => {

    const { username } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                message: 'Username already exists'
            });
        }
        const newUser = await User.create({ username });

        res.status(200).json({
            username: newUser.username,
            _id: newUser._id
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        });
    }

}

exports.getAllUsers = async (req, res, next) => {

    try {
        const users = await User.find();
        if (!users) {
            return res.json({
                message: "Can't find any Users"
            });
        }

        return res.send(
            users
        )
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        });
    }

}

exports.createExercises = async (req, res, next) => {

    const id = req.params._id
    let { description, duration, date } = req.body

    if (!date) {
        date = new Date().toDateString()
    } else {
        var from = date.split("-")
        console.log(from);

        year = from[0]
        month = from[1]
        day = from[2]

        date = new Date(year, month - 1, day).toDateString()
    }
    console.log(date);


    const fetchusername = await User.findOne({ '_id': id }).select({ username: 1, _id: 0 })

    let username = fetchusername.username;

    try {
        const newExercise = await Exercise.create({
            description: description,
            duration: duration,
            date: date,
            userId: id
        })

        return res.json({
            _id: newExercise._id,
            username: username,
            date: date,
            duration: duration,
            description: description
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error'
        });
    }

}

exports.getExercises = async (req, res, next) => {

    const id = req.params._id
    const { from, to, limit } = req.query

    try {
        const fetchusername = await User.findOne({ '_id': id }).select({ username: 1, _id: 0 })
        let username = fetchusername.username;

        const fetchExercises = await Exercise.find({ userId: id }).select({ description: 1, duration: 1, date: 1, _id: 0 })

        let exercises = fetchExercises.map(exercise => {
            return {
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date
            }
        })

        if (from) {
            exercises = exercises.filter(exercise => {
                return new Date(exercise.date) >= new Date(from)
            })
        }

        if (to) {
            exercises = exercises.filter(exercise => {
                return new Date(exercise.date) <= new Date(to)
            })
        }

        if (limit) {
            exercises = exercises.slice(0, limit)
        }

        return res.json({
            _id: id,
            username: username,
            count: exercises.length,
            log: exercises
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error'
        });
    }
}