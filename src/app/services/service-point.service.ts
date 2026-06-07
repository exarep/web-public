import { Injectable } from '@angular/core';
import { ServicePoint } from './service-point.model';

const MOCK_SERVICE_POINTS: ServicePoint[] = [
  {
    esiId: '10443720006103023',
    addressLine1: '1200 Main St',
    addressLine2: '',
    city: 'Dallas',
    state: 'TX',
    zip: '75201',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10443720006103031',
    addressLine1: '1200 Main St',
    addressLine2: 'Apt 201',
    city: 'Dallas',
    state: 'TX',
    zip: '75201',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10443720006103049',
    addressLine1: '1200 Main St',
    addressLine2: 'Apt 302',
    city: 'Dallas',
    state: 'TX',
    zip: '75201',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10443720009244017',
    addressLine1: '4500 Cedar Springs Rd',
    addressLine2: '',
    city: 'Dallas',
    state: 'TX',
    zip: '75219',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10443720009244025',
    addressLine1: '4502 Cedar Springs Rd',
    addressLine2: '',
    city: 'Dallas',
    state: 'TX',
    zip: '75219',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10443720001587338',
    addressLine1: '800 W Davis St',
    addressLine2: '',
    city: 'Dallas',
    state: 'TX',
    zip: '75208',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10443720003310945',
    addressLine1: '2200 McKinney Ave',
    addressLine2: 'Suite 100',
    city: 'Dallas',
    state: 'TX',
    zip: '75201',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'IDR',
    rateClass: 'Small Commercial'
  },
  {
    esiId: '10443720007821102',
    addressLine1: '3300 Elm St',
    addressLine2: '',
    city: 'Dallas',
    state: 'TX',
    zip: '75226',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10443720007821110',
    addressLine1: '3302 Elm St',
    addressLine2: '',
    city: 'Dallas',
    state: 'TX',
    zip: '75226',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790005512001',
    addressLine1: '6100 Westheimer Rd',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77057',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790005512019',
    addressLine1: '6100 Westheimer Rd',
    addressLine2: 'Apt 4B',
    city: 'Houston',
    state: 'TX',
    zip: '77057',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790008834501',
    addressLine1: '1400 Montrose Blvd',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77019',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790008834519',
    addressLine1: '1402 Montrose Blvd',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77019',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790002241776',
    addressLine1: '9200 Kirby Dr',
    addressLine2: 'Suite 300',
    city: 'Houston',
    state: 'TX',
    zip: '77054',
    tdspName: 'CenterPoint Energy',
    meterType: 'IDR',
    rateClass: 'Medium Commercial'
  },
  {
    esiId: '10792930006718205',
    addressLine1: '500 N Chaparral St',
    addressLine2: '',
    city: 'Corpus Christi',
    state: 'TX',
    zip: '78401',
    tdspName: 'AEP Texas',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10792930006718213',
    addressLine1: '502 N Chaparral St',
    addressLine2: '',
    city: 'Corpus Christi',
    state: 'TX',
    zip: '78401',
    tdspName: 'AEP Texas',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10792930004490116',
    addressLine1: '3600 S Alameda St',
    addressLine2: '',
    city: 'Corpus Christi',
    state: 'TX',
    zip: '78411',
    tdspName: 'AEP Texas',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10443720004455103',
    addressLine1: '7700 Forest Ln',
    addressLine2: '',
    city: 'Dallas',
    state: 'TX',
    zip: '75230',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10443720004455111',
    addressLine1: '7702 Forest Ln',
    addressLine2: '',
    city: 'Dallas',
    state: 'TX',
    zip: '75230',
    tdspName: 'Oncor Electric Delivery',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790001133880',
    addressLine1: '2400 Memorial Dr',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77007',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790010220301',
    addressLine1: '1000 Main St',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790010220319',
    addressLine1: '1000 Main St',
    addressLine2: 'Apt 12A',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790010220327',
    addressLine1: '1000 Main St',
    addressLine2: 'Apt 14B',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790010220335',
    addressLine1: '1000 Main St',
    addressLine2: 'Apt 22C',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790010445502',
    addressLine1: '1200 Travis St',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790010445510',
    addressLine1: '1202 Travis St',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790010445528',
    addressLine1: '1204 Travis St',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790010671803',
    addressLine1: '800 Capitol St',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'IDR',
    rateClass: 'Small Commercial'
  },
  {
    esiId: '10957790010671811',
    addressLine1: '800 Capitol St',
    addressLine2: 'Suite 200',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'IDR',
    rateClass: 'Small Commercial'
  },
  {
    esiId: '10957790010671829',
    addressLine1: '800 Capitol St',
    addressLine2: 'Suite 450',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'IDR',
    rateClass: 'Medium Commercial'
  },
  {
    esiId: '10957790010892104',
    addressLine1: '1500 Louisiana St',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790010892112',
    addressLine1: '1502 Louisiana St',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790010892120',
    addressLine1: '1504 Louisiana St',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790011103405',
    addressLine1: '710 Buffalo Bayou Blvd',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790011103413',
    addressLine1: '712 Buffalo Bayou Blvd',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790011334706',
    addressLine1: '2000 Bagby St',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790011334714',
    addressLine1: '2000 Bagby St',
    addressLine2: 'Unit 305',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790011334722',
    addressLine1: '2000 Bagby St',
    addressLine2: 'Unit 810',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'AMS',
    rateClass: 'Residential'
  },
  {
    esiId: '10957790011567208',
    addressLine1: '300 Milam St',
    addressLine2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'IDR',
    rateClass: 'Large Commercial'
  },
  {
    esiId: '10957790011789503',
    addressLine1: '1234 Energy Way',
    addressLine2: 'Suite 500',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    tdspName: 'CenterPoint Energy',
    meterType: 'IDR',
    rateClass: 'Small Commercial'
  }
];

export interface ServicePointSearchResult {
  results: ServicePoint[];
  hasMore: boolean;
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ServicePointService {

  search(term: string, zipCode: string): ServicePointSearchResult {
    if (!term || term.length < 4) {
      return { results: [], hasMore: false, totalCount: 0 };
    }
    const lower = term.toLowerCase();
    const matched = MOCK_SERVICE_POINTS.filter(sp =>
      sp.zip === zipCode && (
        sp.esiId.includes(term) ||
        sp.addressLine1.toLowerCase().includes(lower) ||
        sp.addressLine2.toLowerCase().includes(lower) ||
        sp.city.toLowerCase().includes(lower) ||
        sp.zip.includes(term)
      )
    );
    return {
      results: matched.slice(0, 10),
      hasMore: matched.length > 10,
      totalCount: matched.length
    };
  }
}
