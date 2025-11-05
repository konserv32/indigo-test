import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { WidgetsService } from '../../core/services/widgets.service';
import { ProgressWidgetComponent } from './widgets/progress/progress-widget.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () => import('./dashboard.component').then((c) => c.DashboardComponent),
    children: [
      {
        path: '',
        loadComponent: async () =>
          import('./widgets/progress/progress-widget.component').then(
            (m) => ProgressWidgetComponent,
          ),
        canMatch: [
          async () => {
            const widgetsService = inject(WidgetsService);
            return widgetsService.widget;
          },
        ],
      },
    ],
  },
];
