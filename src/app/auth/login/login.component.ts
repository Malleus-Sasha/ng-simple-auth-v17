import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuth } from '../models/user-auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);
  error = 'test';

  form = this.fb.nonNullable.group({
    email: ['', [Validators.email ,Validators.required]],
    password: ['', Validators.required],
  });

  onSubmit() {
    console.log(':Login:Submit');
    const url = 'http://localhost:3000/login';
    const data = this.form.getRawValue();
    console.log(':Reg: data', data);

    this.http.post<UserAuth>(url, data)
    .pipe(
      catchError((res) => {
        this.error = res.error;
        return throwError(() => 'Errrrrr-r');
      })
    )
    .subscribe((res) => {
      console.log('Reg:Res:', res);
      // TODO Move
      localStorage.setItem('token', res.accessToken);
      if(res.user.id) localStorage.setItem('userId', res.user.id);

      this.authService.currentUserSig.set(res.user);
      this.router.navigateByUrl('/');
    })
  }
}
