import { AuthService } from './auth/services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './auth/models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  http = inject(HttpClient);
  error = 'ng-simple-auth-v17';

  ngOnInit(): void {
    console.log('Root:Init:Sign:', this.authService.currentUserSig());
    // TODO -> service
    this.checkUser();
  }

  logout() {
    console.log(':logout:');
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
  }

  checkUser() {
    const userId = localStorage.getItem('userId');
    this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe({
      next: (res) => {
        console.log(':CheckUser:id1', res);
        this.error = '';
        this.authService.currentUserSig.set(res);
      },
      error: (err) => {
        console.log(':Root:Init:error', err);
        this.authService.currentUserSig.set(null);
        this.error = err.error;
      }
    })
  }
}
