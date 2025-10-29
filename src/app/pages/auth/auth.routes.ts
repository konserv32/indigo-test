import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        loadComponent: async () =>
          import('./sign-in/sign-in.component').then((c) => c.SignInComponent),
        pathMatch: 'full',
        title: 'Вход в систему',
      },
      {
        path: '**',
        redirectTo: 'sign-in',
      }
    ],
  },
];
