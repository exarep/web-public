import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnrollmentService } from '../../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-service-details',
  imports: [FormsModule],
  templateUrl: './enrollment-service-details.page.html'
})
export class EnrollmentServiceDetailsPage {
  protected readonly enrollmentService = inject(EnrollmentService);

  protected readonly serviceAddress = this.enrollmentService.serviceAddress;
  protected readonly esiId = this.enrollmentService.esiId;
  protected readonly canProceed = this.enrollmentService.canProceedToReview;

  updateAddress(field: string, value: string): void {
    this.serviceAddress.update(addr => ({ ...addr, [field]: value }));
  }

  onNext(): void {
    this.enrollmentService.nextStep();
  }

  onBack(): void {
    this.enrollmentService.previousStep();
  }
}
