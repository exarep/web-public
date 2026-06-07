import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.page.html'
})
export class HomePage {
  protected readonly zipCode = signal('');

  constructor(private router: Router) {}

  onGetStarted(): void {
    if (this.zipCode().length === 5) {
      this.router.navigate(['/enroll'], { queryParams: { zip: this.zipCode() } });
    }
  }
}
