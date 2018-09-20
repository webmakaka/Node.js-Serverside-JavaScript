import express from 'express';
import renderPage from '../middleware/renderPage';

const router = express.Router();

router.get('/', renderPage, (req, res) => {
  const { content, preloadedState } = res.locals;
  res.render('index.pug', { content, preloadedState });
});
router.get('/film/:id', renderPage, (req, res) => {
  const { content, preloadedState } = res.locals;
  res.render('index.pug', { content, preloadedState });
});
router.get('/search', renderPage, (req, res) => {
  const { content, preloadedState } = res.locals;
  res.render('index.pug', { content, preloadedState });
});


export default router;
