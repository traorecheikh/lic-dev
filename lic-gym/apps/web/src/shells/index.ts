import type { AppShell, AppShellRoute } from '@gym/types';

export const shellRoutes: AppShellRoute[] = [
  {
    shell: 'admin',
    path: '/admin',
    title: 'Admin',
    description: 'Back-office dashboard and management.',
  },
  {
    shell: 'cashier',
    path: '/cashier',
    title: 'Cashier',
    description: 'Point of sale and reception operations.',
  },
  {
    shell: 'coach',
    path: '/coach',
    title: 'Coach',
    description: 'Classes, attendance, and coaching workflows.',
  },
  {
    shell: 'member',
    path: '/member',
    title: 'Member',
    description: 'Mobile-first member experience.',
  },
];

type ShellPageLoader = () => Promise<unknown>;

export const shellPageLoaders: Record<AppShell, ShellPageLoader> = {
  admin: () => import('./admin/pages/AdminHomePage.vue'),
  cashier: () => import('./cashier/pages/CashierHomePage.vue'),
  coach: () => import('./coach/pages/CoachHomePage.vue'),
  member: () => import('./member/pages/MemberHomePage.vue'),
};
