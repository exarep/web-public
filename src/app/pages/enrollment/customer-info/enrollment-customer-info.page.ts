import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnrollmentService } from '../../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-customer-info',
  imports: [FormsModule],
  templateUrl: './enrollment-customer-info.page.html'
})
export class EnrollmentCustomerInfoPage {
  protected readonly enrollmentService = inject(EnrollmentService);

  protected readonly customerType = this.enrollmentService.customerType;
  protected readonly firstName = this.enrollmentService.firstName;
  protected readonly lastName = this.enrollmentService.lastName;
  protected readonly businessName = this.enrollmentService.businessName;
  protected readonly email = this.enrollmentService.email;
  protected readonly phone = this.enrollmentService.phone;
  protected readonly canProceed = this.enrollmentService.canProceedToServiceDetails;

  onNext(): void {
    this.enrollmentService.nextStep();
  }

  onBack(): void {
    this.enrollmentService.previousStep();
  }
}
