const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const createShopifyAuth = require('@shopify/koa-shopify-auth').default;
const dotenv = require('dotenv');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

dotenv.config();
const { SHOPIFY_SECRET, SHOPIFY_API_KEY } = process.env;
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_SECRET,
      scopes: ['write_products'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;

        console.log('We did it!', shop, accessToken);

        ctx.redirect('/');
      }
    })
  );
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
