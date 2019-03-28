const bcrypt = require('bcryptjs');

const fs = require("fs");

const path =  require("path");

const paths = path.join(__dirname, '../models/db.json');

const db_connection = require('../util/database');

const user = require('../models/user');

exports.login = (req, res, next) => {
    const userId = req.body.email;
    const password = req.body.password;
    user.findOne(
        {
            where: {
                email: userId
            }
        }
    )
    .then(result => {
        if(!result) {
            return res
                .status(200)
                .json({status: 204, message: "Invalid userName or Password"});
        }
        console.log(result.password);

        bcrypt
            .compare(password, result.password)
            .then(check => {
                console.log(check);
                if(check) {
                    return res
                        .status(200)
                        .json({status: 200, message: "User Signed In successfully"});
                } else {
                    return res
                        .status(200)
                        .json({status: 204, message: "Invalid UserId or password"});
                }
            })
    })
    .catch(err => {
        return res
                .status(400)
                .json({"status": 400, "message": err.toString()});
    })
}


exports.signup = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    console.log(req.body);
    user.findOne(
        {
            where: {
                email: email
            }
        }
    )
    .then(result => {
        if(result) {
            return res
                .status(200)
                .json({status: 204, message: "User Already SIgned UP."})
        } else {
        
        return bcrypt
            .hash(password, 12)
            .then(hashedPassword => {
                const User = new user(
                    {
                        name: name,
                        email: email,
                        password: hashedPassword
                    }
                )
                return User.save()
            })
            .then(() => {
                console.log("Savd")
                return res
                    .status(201)
                    .json({status: 201, message: "User SIgned UP."});
            })
        }
    })
    .catch(err => {
        return res
        .status(400)
        .json({"status": 400, "message": err.toString()});
    })
}