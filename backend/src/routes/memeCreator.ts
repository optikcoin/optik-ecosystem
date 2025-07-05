import { Router } from 'express';
const router = Router();
router.post('/create', (req, res) => {
  const { name, symbol } = req.body;
  res.json({ status: 'success', name, symbol, txHash: 'FAKE_TX_HASH' });
});
export default router;
