import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'ng-simple-auth-v17';

  logout() {
    console.log(':loaout:');
  }
}
