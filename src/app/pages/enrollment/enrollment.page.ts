import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment.service';
import { PlanService } from '../../services/plan.service';
import { EnrollmentZipPage } from './zip/enrollment-zip.page';
import { EnrollmentSelectPlanPage } from './select-plan/enrollment-select-plan.page';
import { EnrollmentCustomerInfoPage } from './customer-info/enrollment-customer-info.page';
import { EnrollmentServiceDetailsPage } from './service-details/enrollment-service-details.page';
import { EnrollmentReviewPage } from './review/enrollment-review.page';
import { EnrollmentConfirmationPage } from './confirmation/enrollment-confirmation.page';

@Component({
  selector: 'app-enrollment',
  imports: [
    EnrollmentZipPage,
    EnrollmentSelectPlanPage,
    EnrollmentCustomerInfoPage,
    EnrollmentServiceDetailsPage,
    EnrollmentReviewPage,
    EnrollmentConfirmationPage
  ],
  templateUrl: './enrollment.page.html'
})
export class EnrollmentPage implements OnInit {
  protected readonly enrollmentService = inject(EnrollmentService);
  private readonly planService = inject(PlanService);
  private readonly route = inject(ActivatedRoute);

  protected readonly currentStep = this.enrollmentService.currentStep;
  protected readonly submitted = this.enrollmentService.submitted;
  protected readonly steps = ['ZIP Code', 'Select Plan', 'Your Info', 'Service Address', 'Review'];

  ngOnInit(): void {
    this.enrollmentService.reset();
    const zip = this.route.snapshot.queryParamMap.get('zip');
    if (zip) {
      this.enrollmentService.zipCode.set(zip);
      this.planService.loadPlansForZip(zip);
      this.enrollmentService.currentStep.set(2);
    }
    const planId = this.route.snapshot.queryParamMap.get('plan');
    if (planId) {
      const plans = this.planService.plans();
      const plan = plans.find(p => p.planId === planId);
      if (plan) {
        this.enrollmentService.selectedPlan.set(plan);
      }
    }
  }
}
