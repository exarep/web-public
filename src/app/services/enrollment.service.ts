import { Injectable, signal, computed } from '@angular/core';
import { Plan } from './plan.model';
import { ServicePoint } from './service-point.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {

  readonly currentStep = signal(1);
  readonly totalSteps = 5;

  readonly zipCode = signal('');
  readonly selectedPlan = signal<Plan | null>(null);
  readonly customerType = signal<'individual' | 'business'>('individual');
  readonly firstName = signal('');
  readonly lastName = signal('');
  readonly businessName = signal('');
  readonly email = signal('');
  readonly phone = signal('');
  readonly selectedServicePoint = signal<ServicePoint | null>(null);
  readonly agreeToTerms = signal(false);
  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly confirmationNumber = signal('');

  readonly canProceedToPlans = computed(() => this.zipCode().length === 5);
  readonly canProceedToCustomerInfo = computed(() => this.selectedPlan() !== null);
  readonly canProceedToServiceDetails = computed(() => {
    if (this.customerType() === 'individual') {
      return this.firstName().length > 0 && this.lastName().length > 0 && this.email().length > 0 && this.phone().length > 0;
    }
    return this.businessName().length > 0 && this.email().length > 0 && this.phone().length > 0;
  });
  readonly canProceedToReview = computed(() => this.selectedServicePoint() !== null);
  readonly canSubmit = computed(() => this.agreeToTerms());

  nextStep(): void {
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update(s => s + 1);
    }
  }

  previousStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep.set(step);
    }
  }

  submit(): void {
    this.submitting.set(true);

    setTimeout(() => {
      this.confirmationNumber.set('EXR-' + Math.random().toString(36).substring(2, 10).toUpperCase());
      this.submitting.set(false);
      this.submitted.set(true);
    }, 1500);
  }

  reset(): void {
    this.currentStep.set(1);
    this.zipCode.set('');
    this.selectedPlan.set(null);
    this.customerType.set('individual');
    this.firstName.set('');
    this.lastName.set('');
    this.businessName.set('');
    this.email.set('');
    this.phone.set('');
    this.selectedServicePoint.set(null);
    this.agreeToTerms.set(false);
    this.submitting.set(false);
    this.submitted.set(false);
    this.confirmationNumber.set('');
  }
}
