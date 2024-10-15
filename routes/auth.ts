import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';
import { AuthenticatedRequest } from '../middleware/auth';
const router = express.Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  console.log('in register');
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res): Promise<void> => {
  console.log('in login');
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { id: user._id, name: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    console.log(token);
    res.json({ token});
  }
  res.status(401).send({ message: 'Invalid credentials' });
});

router.get(
  '/protected',
  auth,
  (req: AuthenticatedRequest, res: Response): void => {
    res.json({ message: 'Welcome to the protected page!' });
  }
);

export default router;
