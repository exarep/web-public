import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { REP_ENERGY_PLANS } from '../../data/rep-plans';
import { RatesService } from '../../services/rates.service';
import { ServiceRequestService } from '../../services/service-request.service';

@Component({
  selector: 'app-enroll-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './enroll.page.html',
  styleUrl: './enroll.page.scss',
})
export class EnrollPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly rates = inject(RatesService);
  private readonly serviceRequest = inject(ServiceRequestService);

  protected readonly submitting = signal(false);
  protected readonly submission = signal<{ referenceId: string } | undefined>(undefined);

  protected readonly form = this.fb.group({
    firstName: this.fb.control('', { validators: [Validators.required] }),
    lastName: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    phone: this.fb.control('', {
      validators: [Validators.required, Validators.pattern(/^\+?[\d\s().-]{10,}$/)],
    }),
    serviceAddress: this.fb.control('', { validators: [Validators.required] }),
    serviceCity: this.fb.control('', { validators: [Validators.required] }),
    serviceState: this.fb.control('TX', { validators: [Validators.required, Validators.minLength(2)] }),
    zip: this.fb.control('', { validators: [Validators.required, Validators.pattern(/^\d{5}$/)] }),
    termMonths: this.fb.control<12 | 24 | 36>(12, { validators: [Validators.required] }),
    planCode: this.fb.control('', { validators: [Validators.required] }),
    esiId: this.fb.control(''),
    notes: this.fb.control(''),
    consent: this.fb.control(false, { validators: [Validators.requiredTrue] }),
  });

  constructor() {
    const q = this.route.snapshot.queryParamMap;
    const term = Number(q.get('term'));
    const termMonths: 12 | 24 | 36 = [12, 24, 36].includes(term) ? (term as 12 | 24 | 36) : 12;
    this.form.patchValue({
      zip: this.rates.normalizeZip(q.get('zip') ?? ''),
      planCode: q.get('plan') ?? '',
      termMonths,
    });
  }

  protected planLabel(code: string): string {
    return REP_ENERGY_PLANS.find((p) => p.code === code)?.displayName ?? code;
  }

  protected submit(): void {
    this.submission.set(undefined);
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const v = this.form.getRawValue();
    this.submitting.set(true);
    this.serviceRequest
      .submitRequest({
        zip: v.zip,
        termMonths: v.termMonths,
        planCode: v.planCode,
        firstName: v.firstName,
        lastName: v.lastName,
        email: v.email,
        phone: v.phone,
        serviceAddress: v.serviceAddress,
        serviceCity: v.serviceCity,
        serviceState: v.serviceState,
        esiId: v.esiId || undefined,
        notes: v.notes || undefined,
      })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (res) => this.submission.set(res),
      });
  }
}
