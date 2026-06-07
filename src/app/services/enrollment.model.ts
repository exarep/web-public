import { ServicePoint } from './service-point.model';

export interface EnrollmentRequest {
  zipCode: string;
  planId: string;
  customerType: 'individual' | 'business';
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  servicePoint: ServicePoint;
  agreeToTerms: boolean;
}
