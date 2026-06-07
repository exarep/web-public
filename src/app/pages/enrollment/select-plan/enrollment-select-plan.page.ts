import { Component, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { EnrollmentService } from '../../../services/enrollment.service';
import { PlanService } from '../../../services/plan.service';
import { Plan, PlanEstimate, calculateEstimates } from '../../../services/plan.model';

@Component({
  selector: 'app-enrollment-select-plan',
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './enrollment-select-plan.page.html'
})
export class EnrollmentSelectPlanPage {
  protected readonly enrollmentService = inject(EnrollmentService);
  protected readonly planService = inject(PlanService);

  protected readonly plans = this.planService.plans;
  protected readonly loading = this.planService.loading;
  protected readonly selectedPlan = this.enrollmentService.selectedPlan;

  selectPlan(plan: Plan): void {
    this.enrollmentService.selectedPlan.set(plan);
  }

  getEstimates(plan: Plan): PlanEstimate[] {
    return calculateEstimates(plan);
  }

  formatRate(rate: number): string {
    return (rate * 100).toFixed(1);
  }

  onNext(): void {
    this.enrollmentService.nextStep();
  }

  onBack(): void {
    this.enrollmentService.previousStep();
  }
}
