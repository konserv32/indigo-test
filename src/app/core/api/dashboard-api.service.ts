import { LocalStorageService } from '../services/local-storage.service';
import { Injectable } from '@angular/core';
import { LocalstorageEnum } from '../enums/localstorage.enum';
import { ProjectInterface } from '../models/project.model';
import { Observable, of } from 'rxjs';
import { PROJECTS_MOCK } from '../mock';

@Injectable()
export class DashboardApiService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  public getProjects(page: number): Observable<ProjectInterface[]> {
    const projects = this.localStorageService.getItem<ProjectInterface[]>(
      LocalstorageEnum.projects,
    );

    if (!projects) {
      this.localStorageService.setItem(LocalstorageEnum.projects, PROJECTS_MOCK);
      return of(PROJECTS_MOCK);
    }

    return of(projects);
  }

  public changeProjectPositions(projects: ProjectInterface[]): Observable<ProjectInterface[]> {
    this.localStorageService.setItem(LocalstorageEnum.projects, projects);

    return of(projects);
  }
}
