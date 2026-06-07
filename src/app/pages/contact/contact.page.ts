import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.page.html'
})
export class ContactPage {
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly message = signal('');
  protected readonly submitted = signal(false);

  onSubmit(): void {
    this.submitted.set(true);
  }
}
