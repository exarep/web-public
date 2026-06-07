import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { EnrollmentService } from '../../../services/enrollment.service';
import { Plan, PlanEstimate, calculateEstimates } from '../../../services/plan.model';

@Component({
  selector: 'app-enrollment-review',
  imports: [FormsModule, CurrencyPipe, DecimalPipe],
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
  protected readonly selectedServicePoint = this.enrollmentService.selectedServicePoint;
  protected readonly agreeToTerms = this.enrollmentService.agreeToTerms;
  protected readonly canSubmit = this.enrollmentService.canSubmit;
  protected readonly submitting = this.enrollmentService.submitting;

  formatRate(rate: number): string {
    return (rate * 100).toFixed(1);
  }

  getEstimates(plan: Plan): PlanEstimate[] {
    return calculateEstimates(plan);
  }

  onSubmit(): void {
    this.enrollmentService.submit();
  }

  onBack(): void {
    this.enrollmentService.previousStep();
  }
}
