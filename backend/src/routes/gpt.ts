import { Router } from 'express';
const router = Router();
router.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  res.json({ response: `Pretend GPT replied to "${prompt}" ` });
});
export default router;
