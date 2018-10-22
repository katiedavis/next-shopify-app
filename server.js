const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
/// custom imports
require('isomorphic-fetch');
const session = require('koa-session');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const createShopifyAuth = require('@shopify/koa-shopify-auth').default();
const dotenv = require('dotenv');
///
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { SHOPIFY_SECRET, SHOPIFY_API_KEY } = process.env;

dotenv.config();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  ///
  server.use(session(server));
  server.keys = [SHOPIFY_SECRET];

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

  server.use(verifyRequest());
  ///

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
