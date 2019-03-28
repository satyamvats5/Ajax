/**
 * Copyright (c) 2019 Satyam Kumar <satyamvats5@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const bcrypt = require('bcryptjs');

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