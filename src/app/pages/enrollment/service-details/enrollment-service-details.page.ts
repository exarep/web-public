import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { EnrollmentService } from '../../../services/enrollment.service';
import { ServicePointService } from '../../../services/service-point.service';
import { ServicePoint } from '../../../services/service-point.model';

const MORE_RESULTS_SENTINEL: ServicePoint = {
  esiId: '__MORE__',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zip: '',
  tdspName: '',
  meterType: '',
  rateClass: ''
};

@Component({
  selector: 'app-enrollment-service-details',
  imports: [FormsModule, NgbTypeaheadModule],
  templateUrl: './enrollment-service-details.page.html'
})
export class EnrollmentServiceDetailsPage {
  protected readonly enrollmentService = inject(EnrollmentService);
  private readonly servicePointService = inject(ServicePointService);

  protected readonly selectedServicePoint = this.enrollmentService.selectedServicePoint;
  protected readonly canProceed = this.enrollmentService.canProceedToReview;
  protected readonly searchText = signal('');
  protected moreCount = 0;

  search: OperatorFunction<string, ServicePoint[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => of(this.servicePointService.search(term, this.enrollmentService.zipCode()))),
      map(result => {
        this.moreCount = result.totalCount - result.results.length;
        if (result.hasMore) {
          return [...result.results, MORE_RESULTS_SENTINEL];
        }
        return result.results;
      })
    );

  isSentinel(sp: ServicePoint): boolean {
    return sp.esiId === '__MORE__';
  }

  resultFormatter = (sp: ServicePoint): string => {
    if (this.isSentinel(sp)) {
      return '';
    }
    const addr = sp.addressLine2
      ? `${sp.addressLine1}, ${sp.addressLine2}`
      : sp.addressLine1;
    return `${addr}, ${sp.city}, ${sp.state} ${sp.zip} — ${sp.esiId}`;
  };

  inputFormatter = (value: ServicePoint | string): string => {
    if (typeof value === 'string') {
      return value;
    }
    if (this.isSentinel(value)) {
      return this.searchText();
    }
    const addr = value.addressLine2
      ? `${value.addressLine1}, ${value.addressLine2}`
      : value.addressLine1;
    return `${addr}, ${value.city}, ${value.state} ${value.zip}`;
  };

  onSelect(event: { item: ServicePoint; preventDefault: () => void }): void {
    if (this.isSentinel(event.item)) {
      event.preventDefault();
      return;
    }
    this.enrollmentService.selectedServicePoint.set(event.item);
    this.searchText.set(this.inputFormatter(event.item));
  }

  clearSelection(): void {
    this.enrollmentService.selectedServicePoint.set(null);
    this.searchText.set('');
  }

  onNext(): void {
    this.enrollmentService.nextStep();
  }

  onBack(): void {
    this.enrollmentService.previousStep();
  }
}
