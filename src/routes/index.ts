import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import locationRoute from './location.route';
import barRoute from './bar.route';
import jobRoute from './job.route';
import offerRoute from './offer.route';

const router = express.Router();

interface Route {
  path: string;
  route: any;
}

const defaultRoutes: Route[] = [
  {
    path: '/',
    route: authRoute,
  },
  
  {
    path: '/',
    route: userRoute,
  },

  {
    path: '/',
    route: locationRoute,
  },

  {
    path: '/',
    route: barRoute,
  },

  {
    path: '/',
    route: jobRoute,
  },

  {
    path: '/',
    route: offerRoute,
  },
  
];

/*
const devRoutes: Route[] = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];
*/

  /**
   * @openapi
   * /api/healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     summary: Responds if the app is up and running
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.get("/healthcheck", (_, res) => res.sendStatus(200));

defaultRoutes.forEach((route: Route) => {
  router.use(route.path, route.route);
});

/*
if (config.env === 'development') {
  devRoutes.forEach((route: Route) => {
    router.use(route.path, route.route);
  });
}
*/

export default router;
