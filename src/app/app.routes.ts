import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { PlansPage } from './pages/plans/plans.page';
import { AboutPage } from './pages/about/about.page';
import { ContactPage } from './pages/contact/contact.page';
import { EnrollmentPage } from './pages/enrollment/enrollment.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'plans', component: PlansPage },
  { path: 'about', component: AboutPage },
  { path: 'contact', component: ContactPage },
  { path: 'enroll', component: EnrollmentPage },
  { path: '**', redirectTo: '' }
];
