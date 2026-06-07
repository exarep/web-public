import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnrollmentService } from '../../../services/enrollment.service';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-enrollment-zip',
  imports: [FormsModule],
  templateUrl: './enrollment-zip.page.html'
})
export class EnrollmentZipPage {
  protected readonly enrollmentService = inject(EnrollmentService);
  private readonly planService = inject(PlanService);

  protected readonly zipCode = this.enrollmentService.zipCode;
  protected readonly canProceed = this.enrollmentService.canProceedToPlans;

  onNext(): void {
    this.planService.loadPlansForZip(this.zipCode());
    this.enrollmentService.nextStep();
  }
}
