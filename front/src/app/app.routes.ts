import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OccurrenceDetailsComponent } from './pages/occurrence-details/occurrence-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: OccurrenceDetailsComponent },
];
