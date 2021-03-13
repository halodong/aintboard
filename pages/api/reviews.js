import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { insertReview } from '@/db/reviews';

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { userId, bgId, reviewText } = req.body;
  
  const review = await insertReview(req.db, {
    userId, bgId, reviewText
  });

  return res.json({ review });
});

export default handler;
