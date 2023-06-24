const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECERT = "Harryisgoodboy";


// Route 1:  Creating a user using: POST "/api/auth/createuser"/ SignUP
router.post('/createuser', [
    body('name', 'Enter valid Name').isLength({ min: 3 }),
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password must of atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    // If there are error return bad request and errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // check whether user with same email
    try {
        let users = await User.findOne({ email: req.body.email });
        if (users) {
            return res.status(400).json({ success, error: "Sorry user with this Email exists." })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new UserN
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }

        success = true;
        const authToken = jwt.sign(data, JWT_SECERT);
        res.send({ success, authToken });
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: 'Please Enter Unique Value.', message: err.message})});
    } catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Some Error Occured");
    }
},)



// Route 2: Authenticate a user using: POST "/api/auth/login"/ SignUP
router.post('/login', [
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password cannot be Blank').exists(),
], async (req, res) => {
    // If there are error return bad request and errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try with correct Credentials." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try login with correct Credentials." })
        }

        const payload = {
            user: {
                id: user.id,
            }
        }

        success = true;
        const authToken = jwt.sign(payload, JWT_SECERT);
        res.send({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Internal Server Error Occured");
    }
});


// Route 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
});



module.exports = router