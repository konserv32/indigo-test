import { LocalStorageService } from '../services/local-storage.service';
import { Injectable, signal } from '@angular/core';
import { LocalstorageEnum } from '../enums/localstorage.enum';
import { ProjectInterface } from '../models/project.model';
import { Observable, of } from 'rxjs';
import { PROJECTS_MOCK } from '../mock';
import { DashboardFiltersModel } from '../models/dashboard-filters.model';
import { ProjectStatusesEnum } from '../enums/project-statuses.enum';

@Injectable()
export class DashboardApiService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  public getProjects(filters: DashboardFiltersModel): Observable<ProjectInterface[]> {
    const projects = this.localStorageService.getItem<ProjectInterface[]>(
      LocalstorageEnum.projects,
    );

    if (!projects) {
      this.localStorageService.setItem(LocalstorageEnum.projects, PROJECTS_MOCK);
      return of(PROJECTS_MOCK);
    }

    this.localStorageService.setItem(LocalstorageEnum.filters, filters);

    return of(
      projects
        .filter((project) => project.name.toLowerCase().includes(filters.name.toLowerCase()))
        .filter((project) => {
          switch (filters.status) {
            case ProjectStatusesEnum.new:
              return project.tasksCompleted === 0;
              break;

            case ProjectStatusesEnum.progress:
              return (project.tasksCompleted > 0 && project.tasksCompleted < project.tasksTotal);
              break;

            case ProjectStatusesEnum.completed:
              return project.tasksCompleted === project.tasksTotal;
              break;

            default:
              return true;
          }
        }),
    );
  }
}
