import { LocalStorageService } from '../services/local-storage.service';
import { Injectable } from '@angular/core';
import { LocalstorageEnum } from '../enums/localstorage.enum';
import { ProjectInterface } from '../models/project.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class DashboardApiService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  public getProjects(page: number): Observable<ProjectInterface[]> {
    const projects =
      this.localStorageService.getItem<ProjectInterface[]>(LocalstorageEnum.projects) || [];

    return of(projects);
  }
}
