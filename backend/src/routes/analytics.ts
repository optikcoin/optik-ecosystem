import { Router } from 'express';
const router = Router();
router.get('/volume', (req, res) => {
  res.json({ volume24h: '123456 OPTIK', transactions: 789 });
});
export default router;
