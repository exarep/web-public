import type { ServicePointCandidate } from '../models/service-point.types';

/**
 * Demo-only “ESIID index” — replace with `api-enrollment` / TDSP / third-party lookup in production.
 * Keys are 5-digit ZIPs that exist in `zip-to-tdsp.ts`.
 */
export const MOCK_SERVICE_POINTS_BY_ZIP: Record<string, ServicePointCandidate[]> = {
  '75201': [
    {
      esiId: '10089012345678901234',
      addressLine: '1500 Main St',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      tduName: 'Oncor',
      premiseType: 'RESIDENTIAL',
    },
    {
      esiId: '10089012345678909999',
      addressLine: '2100 Commerce St',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      tduName: 'Oncor',
      premiseType: 'COMMERCIAL',
    },
  ],
  '77002': [
    {
      esiId: '10089098765432101234',
      addressLine: '1001 Louisiana St',
      city: 'Houston',
      state: 'TX',
      zip: '77002',
      tduName: 'CenterPoint Energy',
      premiseType: 'RESIDENTIAL',
    },
  ],
  '78701': [
    {
      esiId: '10089011112222333344',
      addressLine: '800 N Congress Ave',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      tduName: 'Oncor',
      premiseType: 'RESIDENTIAL',
    },
  ],
};

/** Flat list for reverse ESIID lookup */
export const ALL_MOCK_SERVICE_POINTS: ServicePointCandidate[] = Object.values(MOCK_SERVICE_POINTS_BY_ZIP).flat();
