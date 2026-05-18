import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { ALL_MOCK_SERVICE_POINTS, MOCK_SERVICE_POINTS_BY_ZIP } from '../data/mock-service-points';
import type { EsiidLookupByAddress, ServicePointCandidate } from '../models/service-point.types';

/** Optional backend base (no trailing slash). When empty, only mock lookup runs. */
const ESIID_API_BASE = '';

export interface EsiidLookupResponse {
  candidates: ServicePointCandidate[];
  /** When the upstream only confirms a single known ESIID */
  resolved?: ServicePointCandidate;
}

@Injectable({
  providedIn: 'root',
})
export class EsiidLookupService {
  private readonly http = inject(HttpClient);

  /**
   * Typeahead over the demo service-point index. After 4+ characters, substring-match
   * ESIID, street, city, state, ZIP, or TDU name. When `restrictToZip` is a 5-digit ZIP,
   * only candidates in that ZIP are searched (e.g. quote ZIP from enrollment).
   */
  filterDemoIndex(query: string, restrictToZip?: string): ServicePointCandidate[] {
    const raw = query.trim();
    if (raw.length < 4) {
      return [];
    }
    const zipKey = restrictToZip?.replace(/\D/g, '').slice(0, 5);
    const pool =
      zipKey && zipKey.length === 5
        ? ALL_MOCK_SERVICE_POINTS.filter((p) => p.zip === zipKey)
        : ALL_MOCK_SERVICE_POINTS;

    const q = raw.toLowerCase();
    const digitsOnly = raw.replace(/\D/g, '');
    return pool.filter((p) => {
      if (digitsOnly.length >= 4 && p.esiId.includes(digitsOnly)) {
        return true;
      }
      const hay =
        `${p.esiId} ${p.addressLine} ${p.city} ${p.state} ${p.zip} ${p.tduName ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  }

  /**
   * Resolve service points by structured address. Production: POST to enrollment API.
   */
  lookupByAddress(input: EsiidLookupByAddress): Observable<ServicePointCandidate[]> {
    const zip = input.zip.replace(/\D/g, '').slice(0, 5);
    if (!zip || zip.length !== 5) {
      return of([]);
    }

    if (ESIID_API_BASE) {
      return this.http
        .post<EsiidLookupResponse>(`${ESIID_API_BASE}/service-points/lookup`, {
          ...input,
          zip,
        })
        .pipe(
          map((r) => r.resolved ? [r.resolved] : (r.candidates ?? [])),
          catchError(() => this.mockByAddress(input, zip)),
        );
    }

    return this.mockByAddress(input, zip);
  }

  /**
   * Resolve a single service point by ESIID (service point / meter identifier).
   */
  lookupByEsiid(rawEsiid: string): Observable<ServicePointCandidate | null> {
    const digits = rawEsiid.replace(/\D/g, '');
    if (digits.length < 17) {
      return of(null);
    }

    if (ESIID_API_BASE) {
      return this.http
        .get<EsiidLookupResponse>(`${ESIID_API_BASE}/service-points/esiid/${digits}`)
        .pipe(
          map((r) => r.resolved ?? r.candidates?.[0] ?? null),
          catchError(() => this.mockByEsiid(digits)),
        );
    }

    return this.mockByEsiid(digits);
  }

  private mockByAddress(input: EsiidLookupByAddress, zip: string): Observable<ServicePointCandidate[]> {
    const pool = MOCK_SERVICE_POINTS_BY_ZIP[zip] ?? [];
    if (pool.length === 0) {
      return of([]).pipe(delay(350));
    }
    const streetQ = input.street.trim().toLowerCase();
    const cityQ = input.city.trim().toLowerCase();
    const filtered = pool.filter(
      (p) =>
        (!streetQ || p.addressLine.toLowerCase().includes(streetQ) || streetQ.length < 4) &&
        (!cityQ || p.city.toLowerCase() === cityQ),
    );
    const out = filtered.length > 0 ? filtered : pool;
    return of(out).pipe(delay(400));
  }

  private mockByEsiid(digits: string): Observable<ServicePointCandidate | null> {
    const hit = ALL_MOCK_SERVICE_POINTS.find((p) => p.esiId === digits);
    if (hit) {
      return of({ ...hit }).pipe(delay(300));
    }
    return of(null).pipe(delay(300));
  }
}
