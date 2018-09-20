const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body')
const controllers = require('../controllers/');

router.get('/', controllers.index);
router.get('/work', controllers.myWorks)
router.post('/work', koaBody({
  multipart: true,
  formidable: {
    uploadDir: process.cwd() + "/public/upload"
  }
}), controllers.uploadWork)

router.get('/contact-me', controllers.contactMe)
router.get('/login', controllers.login)
router.post('/login', koaBody(), controllers.auth)

router.get('*', async(ctx, next) => {
  ctx.render('error', {
    status: ctx.response.status,
    error: ctx.response.message
  });
})

module.exports = router;