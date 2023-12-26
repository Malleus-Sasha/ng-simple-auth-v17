import { ModalService } from './../../services-ui/modal.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';

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
    
    <button (click)="openModal(modalTemplate)">Open modal</button>

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
    
    <ng-template #modalTemplate>
      <div>This is our custom modal :MESSAGES:</div>
    </ng-template>
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

  constructor(private modalService: ModalService) {}

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

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Foo' })
      .subscribe((action: any) => {
        console.log('modal:Action:', action);
      })
  }
}
