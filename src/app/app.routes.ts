import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: '',
    loadComponent: async () =>
      import('./shared/layouts/main/main-layout.component').then((m) => m.MainLayoutComponent),
    canActivate: [AuthGuard],
    title: 'Cat management app'
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
