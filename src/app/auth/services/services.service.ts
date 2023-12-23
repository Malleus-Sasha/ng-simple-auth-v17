import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  currentUserSig = signal<User | undefined | null>(undefined);

  constructor() { }
}
