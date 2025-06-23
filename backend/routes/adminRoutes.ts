// backend/routes/adminRoutes.ts
import express from 'express';
const router = express.Router();

router.get('/admin', (req, res) => {
  res.send('Admin route working');
});

export default router;
