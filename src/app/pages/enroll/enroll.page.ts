import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, startWith } from 'rxjs';
import { REP_ENERGY_PLANS } from '../../data/rep-plans';
import type { ServicePointCandidate } from '../../models/service-point.types';
import { EsiidLookupService } from '../../services/esiid-lookup.service';
import { PlansService } from '../../services/plans.service';
import { ServiceRequestService } from '../../services/service-request.service';

function esiIdFormatValidator(control: AbstractControl): ValidationErrors | null {
  const digits = String(control.value ?? '').replace(/\D/g, '');
  if (!digits) {
    return { esiIdRequired: true };
  }
  if (digits.length < 17 || digits.length > 22) {
    return { esiIdFormat: true };
  }
  return null;
}

function phoneDigitsValidator(control: AbstractControl): ValidationErrors | null {
  const d = String(control.value ?? '').replace(/\D/g, '');
  return d.length >= 10 ? null : { phoneDigits: true };
}

export type AccountType = 'residential' | 'commercial';

@Component({
  selector: 'app-enroll-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './enroll.page.html',
  styleUrl: './enroll.page.scss',
})
export class EnrollPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly plansService = inject(PlansService);
  private readonly serviceRequest = inject(ServiceRequestService);
  private readonly esiidLookup = inject(EsiidLookupService);

  /** Plan + term from /plans — not stored in hidden inputs (those are brittle). */
  protected readonly enrollmentOffer = signal<{
    planCode: string;
    termMonths: 12 | 24 | 36;
    zipFromPlans: string;
  } | null>(null);

  protected readonly submitting = signal(false);
  protected readonly submission = signal<{ referenceId: string } | undefined>(undefined);

  /** Single box: any fragment of ESIID, address, city, ZIP, TDU (demo index). */
  protected readonly serviceSearchQuery = signal('');

  protected readonly esiidMatches = computed(() =>
    this.esiidLookup.filterDemoIndex(this.serviceSearchQuery(), this.servicePointQuoteZipScope()),
  );

  protected readonly selectedCandidate = signal<ServicePointCandidate | undefined>(undefined);

  protected readonly form = this.fb.group({
    pickEsiid: this.fb.control(''),
    accountType: this.fb.control<AccountType>('residential'),
    businessName: this.fb.control(''),
    firstName: this.fb.control('', { validators: [Validators.required] }),
    lastName: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    phone: this.fb.control('', { validators: [Validators.required, phoneDigitsValidator] }),
    serviceAddress: this.fb.control('', { validators: [Validators.required] }),
    serviceCity: this.fb.control('', { validators: [Validators.required] }),
    serviceState: this.fb.control('TX', { validators: [Validators.required, Validators.minLength(2)] }),
    zip: this.fb.control('', { validators: [Validators.required, Validators.pattern(/^\d{5}$/)] }),
    esiId: this.fb.control('', { validators: [Validators.required, esiIdFormatValidator] }),
    notes: this.fb.control(''),
    consent: this.fb.control(false, { validators: [Validators.requiredTrue] }),
  });

  constructor() {
    const q = this.route.snapshot.queryParamMap;
    const plan = q.get('plan') ?? '';
    const term = Number(q.get('term'));
    const termMonths: 12 | 24 | 36 = [12, 24, 36].includes(term) ? (term as 12 | 24 | 36) : 12;
    const zipFromRoute = this.plansService.normalizeZip(q.get('zip') ?? '');
    const validPlan = REP_ENERGY_PLANS.some((p) => p.code === plan);

    if (validPlan && plan) {
      this.enrollmentOffer.set({ planCode: plan, termMonths, zipFromPlans: zipFromRoute });
    } else {
      this.enrollmentOffer.set(null);
    }

    if (zipFromRoute.length === 5) {
      this.form.patchValue({ zip: zipFromRoute });
    }

    const businessNameCtrl = this.form.controls.businessName;
    this.form.controls.accountType.valueChanges
      .pipe(
        startWith(this.form.controls.accountType.value),
        takeUntilDestroyed(),
      )
      .subscribe((t) => {
        if (t === 'commercial') {
          businessNameCtrl.setValidators([Validators.required]);
        } else {
          businessNameCtrl.clearValidators();
          businessNameCtrl.setValue('');
        }
        businessNameCtrl.updateValueAndValidity({ emitEvent: false });
      });
  }

  protected isCommercial(): boolean {
    return this.form.controls.accountType.value === 'commercial';
  }

  /** Quote ZIP from plans (5 digits) when available; limits demo service-point search to that ZIP. */
  protected servicePointQuoteZipScope(): string | undefined {
    const z = this.plansService.normalizeZip(this.enrollmentOffer()?.zipFromPlans ?? '');
    return z.length === 5 ? z : undefined;
  }

  protected onServiceSearchInput(raw: string): void {
    this.serviceSearchQuery.set(raw);
    const trimmed = raw.trim();
    if (trimmed.length < 4) {
      this.form.patchValue({ pickEsiid: '' });
      this.clearServiceFieldsOnly();
      return;
    }
    const list = this.esiidLookup.filterDemoIndex(raw, this.servicePointQuoteZipScope());
    const pv = this.form.controls.pickEsiid.value;
    if (pv && !list.some((m) => m.esiId === pv)) {
      this.form.patchValue({ pickEsiid: '' });
      this.clearServiceFieldsOnly();
    }
  }

  protected pickListItem(c: ServicePointCandidate): void {
    this.applyCandidate(c);
  }

  protected isRowSelected(c: ServicePointCandidate): boolean {
    return this.form.controls.pickEsiid.value === c.esiId;
  }

  protected planLabel(code: string): string {
    return REP_ENERGY_PLANS.find((p) => p.code === code)?.displayName ?? code;
  }

  protected clearServicePoint(): void {
    this.serviceSearchQuery.set('');
    this.form.patchValue({ pickEsiid: '' });
    this.clearServiceFieldsOnly();
  }

  private clearServiceFieldsOnly(): void {
    const offer = this.enrollmentOffer();
    const zipFallback =
      offer?.zipFromPlans && offer.zipFromPlans.length === 5 ? offer.zipFromPlans : this.form.controls.zip.value;
    this.selectedCandidate.set(undefined);
    this.form.patchValue({
      pickEsiid: '',
      esiId: '',
      serviceAddress: '',
      serviceCity: '',
      serviceState: 'TX',
      zip: zipFallback ?? '',
    });
  }

  private applyCandidate(c: ServicePointCandidate): void {
    this.selectedCandidate.set(c);
    this.form.patchValue({
      pickEsiid: c.esiId,
      esiId: c.esiId,
      serviceAddress: c.addressLine,
      serviceCity: c.city,
      serviceState: c.state,
      zip: c.zip,
    });
  }

  protected submit(): void {
    this.submission.set(undefined);
    const offer = this.enrollmentOffer();
    if (!offer) {
      return;
    }
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const v = this.form.getRawValue();
    const esiNorm = v.esiId.replace(/\D/g, '');
    this.submitting.set(true);
    const sp = this.selectedCandidate();
    this.serviceRequest
      .submitRequest({
        zip: v.zip,
        termMonths: offer.termMonths,
        planCode: offer.planCode,
        accountType: v.accountType,
        businessName: v.accountType === 'commercial' ? v.businessName.trim() : undefined,
        firstName: v.firstName,
        lastName: v.lastName,
        email: v.email,
        phone: v.phone,
        serviceAddress: v.serviceAddress,
        serviceCity: v.serviceCity,
        serviceState: v.serviceState,
        esiId: esiNorm,
        servicePoint: sp
          ? {
              esiId: sp.esiId,
              addressLine: sp.addressLine,
              city: sp.city,
              state: sp.state,
              zip: sp.zip,
              tduName: sp.tduName,
            }
          : undefined,
        notes: v.notes || undefined,
      })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (res) => this.submission.set(res),
      });
  }
}
