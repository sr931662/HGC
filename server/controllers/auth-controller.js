const bcrypt = require("bcryptjs");
const User = require("../database/UserSchema");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config({ path : "./config.env"})

const home = async (req, res) => {
    try {
        res.status(200).send("Home page with authorization");
    } catch (err) {
        res.status(400).send({ message: "Page not found" });
    }
};

const login = async (req, res) => {
    try { 
        const { email, pass } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(pass, userExist.pass);

        if (isMatch) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userID: userExist._id.toString(),
                fname: userExist.fname.toString()
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { fname, lname, phone, email, pass, repass } = req.body;

        if (pass !== repass) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(pass, 10);

        const userCreated = await User.create({ 
            fname, 
            lname, 
            phone, 
            email, 
            pass: hashedPassword 
        });

        res.status(201).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = { home, login, register }