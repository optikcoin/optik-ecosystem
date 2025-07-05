import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => res.json({ message: 'Wallet API is live' }));
export default router;
