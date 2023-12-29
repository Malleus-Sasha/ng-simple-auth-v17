import { ModalService } from './../../services-ui/modal.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { AlertComponent } from '../../ui/alert/alert.component';
import { AlertService } from '../../ui/alert/alert.service';
import { AlertActions } from '../../ui/alert/types/alert-actions';
import { TooltipDirective } from '../../ui/tooltip/tooltip.directive';
import { TooltipComponent } from '../../ui/tooltip/tooltip.component';

interface Mess {
  text: string;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [AlertComponent, TooltipDirective],
  template: `
    <p>messages works!</p>

    <app-alert/>

    <div>
      <button (click)="showAlert(alertActions.DANGER)">Show danger</button>
      <button (click)="showAlertSuccess(alertActions.SUCCESS)">Show success</button>
      | 
      <button (click)="openModal(modalTemplate)">Open modal</button>
      | 
      <button appTooltip tooltipText="This is our tooltip text" class="btn-primary">Hover to see tooltip</button>
    </div>

    

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
  alertActions = AlertActions;
  messages: Mess[] = [];
  error = '';

  constructor(
    private modalService: ModalService,
    private alertService: AlertService,
  ) {}

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

  showAlert(type: AlertActions) {
    this.alertService.setAlert({
      type,
      text: 'This is our test Alert -1-',
    })
  }

  showAlertSuccess(type: AlertActions) {
    this.alertService.setAlert({
      type,
      text: 'Is SUCCESS Alert',
    })
  }
}
