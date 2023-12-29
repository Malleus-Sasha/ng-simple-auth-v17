import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from './types/alert';
import { AlertActions } from './types/alert-actions';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert$ = new Subject<Alert>();

  constructor() { }

  setAlert(alert: Alert): void {
    this.alert$.next(alert);
  }

  getAlert(): Observable<Alert> {
    return this.alert$.asObservable();
  }
}
