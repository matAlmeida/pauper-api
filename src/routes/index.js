import express from 'express';
import cards from './cards';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'OK' });
});

router.use('/cards', cards);

export default router;
