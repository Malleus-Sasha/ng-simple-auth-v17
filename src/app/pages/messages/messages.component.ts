import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

interface Mess {
  text: string;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  template: `
    <p>
      messages works!
    </p>
    @if (error) {
      <div>
        <div class="invalid-mess">{{ error }}</div>
      </div>
    }
    <div>
      @for (item of messages; track $index) {
        <p>{{ item.text }}</p>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class MessagesComponent implements OnInit {
  private http = inject(HttpClient);
  messages: Mess[] = [];
  error = '';

  ngOnInit(): void {
    this.getMessages();
  }
  getMessages() {
    this.http.get<Mess[]>('http://localhost:3000/messages').subscribe({
      // next: (value) => {},
      next: (value) => {
        console.log(':Root:Mes', value);
        this.messages = value;
      }, 
      error: (err) => {
        console.log(':Root:Init:error', err);
        // this.authService.currentUserSig.set(null);
        this.error = err.error;
      },
    });
  }
}
