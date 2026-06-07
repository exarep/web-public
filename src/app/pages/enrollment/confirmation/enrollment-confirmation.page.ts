import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnrollmentService } from '../../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-confirmation',
  imports: [RouterLink],
  templateUrl: './enrollment-confirmation.page.html'
})
export class EnrollmentConfirmationPage {
  protected readonly enrollmentService = inject(EnrollmentService);
  protected readonly confirmationNumber = this.enrollmentService.confirmationNumber;
}
