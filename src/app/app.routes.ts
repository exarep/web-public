import { Routes } from '@angular/router';
import { EnrollPage } from './pages/enroll/enroll.page';
import { HomePage } from './pages/home/home.page';
import { PlansPage } from './pages/plans/plans.page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Exarep | Texas retail energy' },
  { path: 'plans', component: PlansPage, title: 'Rates & plans | Exarep' },
  { path: 'enroll', component: EnrollPage, title: 'Request service | Exarep' },
  { path: '**', redirectTo: '' },
];
