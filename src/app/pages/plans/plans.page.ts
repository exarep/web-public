import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { PlanService } from '../../services/plan.service';
import { Plan } from '../../services/plan.model';

@Component({
  selector: 'app-plans',
  imports: [CurrencyPipe],
  templateUrl: './plans.page.html'
})
export class PlansPage implements OnInit {
  private readonly planService = inject(PlanService);
  private readonly router = inject(Router);

  protected readonly plans = this.planService.plans;
  protected readonly loading = this.planService.loading;

  ngOnInit(): void {
    if (this.plans().length === 0) {
      this.planService.loadPlansForZip('75001');
    }
  }

  onSelectPlan(plan: Plan): void {
    this.router.navigate(['/enroll'], { queryParams: { plan: plan.planId } });
  }

  formatRate(rate: number): string {
    return (rate * 100).toFixed(1);
  }
}
