import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WidgetsService {
  public widget = true;

  public readonly hasProgressWidget = signal<boolean>(false);
}
