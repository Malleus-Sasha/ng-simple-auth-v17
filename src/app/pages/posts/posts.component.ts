import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  template: `
    <p>
      posts works!
    </p>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class PostsComponent {

}
