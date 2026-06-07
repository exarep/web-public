export interface EnrollmentRequest {
  zipCode: string;
  planId: string;
  customerType: 'individual' | 'business';
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  serviceAddress: ServiceAddress;
  esiId: string;
  agreeToTerms: boolean;
}

export interface ServiceAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
}
