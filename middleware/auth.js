const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    console.log(req.header('Authorization')?.split(' ')[1])
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.log('incoorect jsonwebtoken ',error)
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = auth;