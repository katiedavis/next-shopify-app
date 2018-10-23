const proxy = require('koa-better-http-proxy');
const { Content } = require('koa');

const PROXY_BASE_PATH = '/adminapi';
const ADMIN_PATH = '/admin';

export const shopifyAdminProxy = proxyOptions => {
  return async function shopifyAdminProxyMiddleware(ctx, next) {
    const { session = {} } = ctx;

    const shop = proxyOptions ? proxyOptions.shop : session.shop;
    const accessToken = proxyOptions
      ? proxyOptions.password
      : session.accessToken;

    if (accessToken == null || shop == null) {
      ctx.throw(403, 'Unauthorized');
      return;
    }

    if (ctx.path !== PROXY_BASE_PATH || ctx.method !== 'POST') {
      await next();
      return;
    }

    await proxy(shop, {
      https: true,
      parseReqBody: false,
      // Setting request header here, not response. That's why we don't use ctx.set()
      // proxy middleware will grab this request header
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      proxyReqPathResolver() {
        return `https://${shop}${ADMIN_PATH}`;
      }
    })(
      ctx,

      /*
        We want this middleware to terminate, not fall through to the next in the chain,
        but sadly it doesn't support not passing a `next` function. To get around this we
        just pass our own dummy `next` that resolves immediately.
      */
      noop
    );
  };
};

async function noop() {}
