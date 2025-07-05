import { Router } from 'express';
const router = Router();
router.get('/status', (req, res) => {
  res.json({ mining: true, hashpower: Math.floor(Math.random() * 1000) });
});
export default router;
