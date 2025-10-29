import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: 'auth',
    loadChildren: async () => import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    data: {
      preload: false,
    },
  },
  { path: '**', redirectTo: '' },
];
