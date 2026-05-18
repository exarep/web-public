import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PlansService } from '../../services/plans.service';

@Component({
  selector: 'app-plans-page',
  imports: [DecimalPipe],
  templateUrl: './plans.page.html',
  styleUrl: './plans.page.scss',
})
export class PlansPage {
  private readonly plansService = inject(PlansService);
  private readonly router = inject(Router);

  protected readonly zipInput = signal('');

  protected readonly quoteState = computed(() => {
    const zip = this.plansService.normalizeZip(this.zipInput());
    if (zip.length !== 5) {
      return { kind: 'empty' as const };
    }
    const result = this.plansService.quotePlansForZip(zip);
    if (!result) {
      return { kind: 'unknown' as const, zip };
    }
    return { kind: 'ok' as const, ...result };
  });

  protected updateZip(value: string): void {
    this.zipInput.set(value);
  }

  protected choosePlan(zip: string, planCode: string, termMonths: number): void {
    void this.router.navigate(['/enroll'], {
      queryParams: { zip, plan: planCode, term: termMonths },
    });
  }
}
