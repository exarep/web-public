import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface ServicePointSnapshot {
  esiId: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  tduName?: string;
}

export interface ServiceRequestPayload {
  zip: string;
  termMonths: number;
  planCode: string;
  /** Individual household vs small commercial account holder */
  accountType: 'residential' | 'commercial';
  /** Required when accountType is commercial */
  businessName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceAddress: string;
  serviceCity: string;
  serviceState: string;
  esiId: string;
  /** When lookup confirmed a structured service point */
  servicePoint?: ServicePointSnapshot;
  notes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceRequestService {
  /** Client-side placeholder until enrollment API is connected — logs payload and resolves with a reference id. */
  submitRequest(payload: ServiceRequestPayload): Observable<{ referenceId: string }> {
    console.info('[Exarep] demo enrollment request (no backend)', payload);
    const referenceId = `EXR-${Date.now()}`;
    return of({ referenceId }).pipe(delay(450));
  }
}
