import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { EnrollmentService } from '../../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-review',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './enrollment-review.page.html'
})
export class EnrollmentReviewPage {
  protected readonly enrollmentService = inject(EnrollmentService);

  protected readonly selectedPlan = this.enrollmentService.selectedPlan;
  protected readonly customerType = this.enrollmentService.customerType;
  protected readonly firstName = this.enrollmentService.firstName;
  protected readonly lastName = this.enrollmentService.lastName;
  protected readonly businessName = this.enrollmentService.businessName;
  protected readonly email = this.enrollmentService.email;
  protected readonly phone = this.enrollmentService.phone;
  protected readonly serviceAddress = this.enrollmentService.serviceAddress;
  protected readonly esiId = this.enrollmentService.esiId;
  protected readonly agreeToTerms = this.enrollmentService.agreeToTerms;
  protected readonly canSubmit = this.enrollmentService.canSubmit;
  protected readonly submitting = this.enrollmentService.submitting;

  formatRate(rate: number): string {
    return (rate * 100).toFixed(1);
  }

  onSubmit(): void {
    this.enrollmentService.submit();
  }

  onBack(): void {
    this.enrollmentService.previousStep();
  }
}
