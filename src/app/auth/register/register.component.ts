import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { UserAuth } from '../models/user-auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);
  error = 'test';

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    pas: [''],
  });

  onSubmit() {
    console.log(':Register:Submit');
    const url = 'http://localhost:3000/register';
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
      // TODO -> service
      localStorage.setItem('token', res.accessToken);
      if(res.user.id) localStorage.setItem('userId', res.user.id);

      this.authService.currentUserSig.set(res.user);
      this.router.navigateByUrl('/');
    })
  }
}
