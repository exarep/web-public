import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface ServiceRequestPayload {
  zip: string;
  termMonths: number;
  planCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceAddress: string;
  serviceCity: string;
  serviceState: string;
  esiId?: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceRequestService {
  /** Placeholder until `api-enrollment` exists — logs and resolves. */
  submitRequest(payload: ServiceRequestPayload): Observable<{ referenceId: string }> {
    // Intentionally no network call yet.
    console.info('[Exarep — fake REP] demo enrollment payload (no backend, no malice)', payload);
    const referenceId = `EXR-${Date.now()}`;
    return of({ referenceId }).pipe(delay(450));
  }
}
