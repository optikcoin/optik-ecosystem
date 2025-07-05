import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => res.json({ message: 'Trading API is live' }));
export default router;
