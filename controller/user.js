var express = require('express');
var final = require('../module/category');
var sign = require('../module/sig');
var puzzle = require('../module/puzzel');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

async function main(email) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'kalthiyamansi2000@gmail.com', // generated ethereal user
            pass: 'lessbejmvbdjkees', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'kalthiyamansi2000@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello welcome world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
exports.secure = async function (req, res, next) {
    try {
        // console.log(req.headers.token);
        let token = req.headers.token
        console.log(token);
        if (!token) {
            throw new Error('user not found')
        }
        let checkpass = await jwt.verify(token, 'hello');
        let checkuser = await sign.findById(checkpass.id)
        console.log(checkuser);
        next()
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.signup = async function (req, res, next) {
    try {
        // console.log(req.body);
        if (!req.body.name || !req.body.email) {
            throw new Error('data is incomplite')
        }
        if (req.body.password != req.body.cpassword) {
            throw new Error('pass is not match')
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        console.log(req.body.password);
        let data = await sign.create(req.body)
        let token = await jwt.sign({ id: data._id }, 'hello');
        main(req.body.email)
        res.status(201).json({
            status: "add",
            message: "added successfully",
            data: data,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.login = async function (req, res, next) {
    try {
        // console.log(req.body);
        let data = await sign.findOne({ email: req.body.email })
        if (!data) {
            throw new Error('user is not define')
        }
        let checkpass = await bcrypt.compare(req.body.password, data.password)
        console.log(checkpass);
        if (!checkpass) {
            throw new Error('pass is not match')
        };
        let token = await jwt.sign({ id: data._id }, 'hello');
        console.log(data);
        res.status(200).json({
            status: "add",
            message: "login successfully",
            data: data,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.add = async function (req, res, next) {
    try {
        console.log(req.body);
        console.log(req.files);
        req.body.bgimage = req.files.bgimage[0].filename
        console.log(req.body.bgimage);

        req.body.icon = req.files.icon[0].filename
        console.log(req.body.icon);
        let data = await (await final.create(req.body))
        console.log(data);
        res.status(201).json({
            status: "add",
            message: "added successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.delete = async function (req, res, next) {
    try {
        console.log(req.body);
        console.log(req.files);
        let id = req.query.id
        console.log(id);

        let data = await final.findByIdAndDelete(id)
        console.log(data);
        res.status(201).json({
            status: "add",
            message: "added successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.update = async function (req, res, next) {
    try {
        console.log(req.files);
        if (req.files) {
            req.body.bgimage = req.files.bgimage[0].filename
            console.log(req.body.bgimage);

            req.body.icon = req.files.icon[0].filename
            console.log(req.body.icon);
        }
        let eid = req.query.eid
        console.log(eid);
        let data = await final.findByIdAndUpdate(eid, req.body)
        console.log(data);
        res.status(201).json({
            status: "add",
            message: "added successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.show = async function (req, res, next) {
    try {
        let data = await final.find()
        console.log(data);
        res.status(200).json({
            status: "add",
            message: "added successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.puzzadd = async function (req, res, next) {
    try {
        console.log(req.body);
        console.log(req.file);
        req.body.queimage = req.file.filename
        console.log(req.body.queimage);

        let data = await puzzle.create(req.body)
        console.log(data);
        res.status(201).json({
            status: "add",
            message: "added successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.puzzdel = async function (req, res, next) {
    try {
        let id = req.query.id
        console.log(id);

        let data = await puzzle.findByIdAndDelete(id)
        console.log(data);
        res.status(201).json({
            status: "add",
            message: "added successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.puzzupdate = async function (req, res, next) {
    try {
        console.log(req.body);
        console.log(req.file);
        let eid = req.query.eid
        if (req.file) {
            req.body.queimage = req.file.filename
            console.log(req.body.queimage);
        }
        let data = await puzzle.findByIdAndUpdate(eid, req.body)
        console.log(data);
        res.status(201).json({
            status: "add",
            message: "added successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.puzzshow = async function (req, res, next) {
    try {
        let data = await puzzle.find().populate('categeryname')
        console.log(data);
        res.status(200).json({
            status: "add",
            message: "added successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.allcatshow = async function (req, res, next) {
    try {
        let categeryid = req.query.categeryid
        let level = req.query.level

        let data = await puzzle.find({ categery: categeryid, level: level })

        if (!data || !data.length) {
            throw new Error('puzzle is not found')
        }
        // console.log(req.query.cateid);
        console.log(data);
        res.status(200).json({
            status: "add",
            message: "category added successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}