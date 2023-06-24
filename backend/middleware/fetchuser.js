var jwt = require('jsonwebtoken');

const JWT_SECERT = "Harryisgoodboy";

const fetchuser = (req, res, next) => {
    // GEt user from jwt token and add ID to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" });
    }

    try {
        const string = jwt.verify(token, JWT_SECERT);
        req.user = string.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" });
    }
}



module.exports = fetchuser;