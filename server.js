const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
require('isomorphic-fetch');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

dotenv.config();
const { SHOPIFY_SECRET, SHOPIFY_API_KEY } = process.env;
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session(server));
  server.keys = [SHOPIFY_SECRET];

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
      scopes: ['write_products', 'read_products'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.redirect('/');
      }
    })
  );

  server.use(verifyRequest());
  server.use(graphQLProxy());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
