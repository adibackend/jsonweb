const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id ,name:user.username}, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token)
        return res.json({ token });
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

router.get('/protected',auth, (req, res) => {
    console.log('in protected')
    console.log(req.user)
    res.json({ message: 'Welcome to the protected page!' });
});


module.exports = router;