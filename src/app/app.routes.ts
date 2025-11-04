import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: '',
    title: 'Cat management app',
    canActivate: [AuthGuard],
    loadComponent: async () =>
      import('./shared/layouts/main/main-layout.component').then((m) => m.MainLayoutComponent),
    loadChildren: async () =>
      import('./pages/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },

  {
    path: 'auth',
    loadChildren: async () => import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    data: {
      preload: false,
    },
  },
  { path: '**', redirectTo: '' },
];
