import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { shellPageLoaders, shellRoutes } from '../shells';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: shellRoutes[0]?.path ?? '/admin' },
  ...shellRoutes.map((shellRoute) => ({
    path: shellRoute.path,
    component: shellPageLoaders[shellRoute.shell],
  })),
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
