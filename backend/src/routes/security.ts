import { Router } from 'express';
const router = Router();
router.post('/scan', (req, res) => {
  const { contractAddress } = req.body;
  res.json({ contractAddress, score: 93, issues: ['None detected'] });
});
export default router;
