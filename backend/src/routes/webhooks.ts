import { Router } from 'express';
const router = Router();
router.post('/', (req, res) => {
  console.log('Webhook payload received:', req.body);
  res.status(200).send('OK');
});
export default router;
