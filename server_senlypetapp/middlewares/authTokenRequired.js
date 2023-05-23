const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Staff = require('../models/Staff');
module.exports = (req, res, next) => {
    const authorization = req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"]||req.headers;

    console.log(authorization);
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in, key not give" });
    }
    const token = authorization.replace("Bearer ", "");
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ err: "You must be logged in, token invalid" });
        }
        const { _id } = payload;
        if (Customer.findById(_id)) {
            Customer.findById(_id).then(customerdata => {
                req.customer = customerdata;
                next();
    
            })
            
        } else if (Staff.findById(_id)) {
            Staff.findById(_id).then(staffdata => {
                req.staff = staffdata;
                next();
    
            })
            
        }
    })
}