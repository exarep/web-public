import { Injectable } from '@angular/core';
import { REP_ENERGY_PLANS } from '../data/rep-plans';
import { TDSP_BY_ID } from '../data/tdsp-catalog';
import type { QuotedPlan, TdspTerritory, ZipLookupResult } from '../data/tdsp.types';
import { ZIP_TO_TDSP } from '../data/zip-to-tdsp';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  private readonly catalogPlans = REP_ENERGY_PLANS;

  normalizeZip(raw: string): string {
    return raw.replace(/\D/g, '').slice(0, 5);
  }

  lookupZip(zip: string): ZipLookupResult | undefined {
    const z = this.normalizeZip(zip);
    if (z.length !== 5) {
      return undefined;
    }
    const id = ZIP_TO_TDSP[z];
    if (!id) {
      return undefined;
    }
    return { zip: z, tdsp: TDSP_BY_ID[id] };
  }

  quotePlansForZip(zip: string): { lookup: ZipLookupResult; quotes: QuotedPlan[] } | undefined {
    const lookup = this.lookupZip(zip);
    if (!lookup) {
      return undefined;
    }
    const quotes: QuotedPlan[] = this.catalogPlans.map((p) => ({
      ...p,
      estimatedAllInCentsPerKwh: this.sumCentsPerKwh(p.energyCentsPerKwh, lookup.tdsp),
    }));
    return { lookup, quotes };
  }

  getTdspCatalog(): TdspTerritory[] {
    return Object.values(TDSP_BY_ID);
  }

  /**
   * Simplified “all-in” comparison (¢/kWh): REP energy + TDU per-kWh component.
   * Monthly base charges depend on usage; we surface them separately on the UI.
   */
  private sumCentsPerKwh(energyCentsPerKwh: number, tdsp: TdspTerritory): number {
    return Math.round((energyCentsPerKwh + tdsp.deliveryCentsPerKwh) * 1000) / 1000;
  }
}
