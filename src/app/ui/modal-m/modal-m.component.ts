import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-m',
  standalone: true,
  imports: [],
  template: `
    <p>
      modal-m works!
    </p>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class ModalMComponent {

}
