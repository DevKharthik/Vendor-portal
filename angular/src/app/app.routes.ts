import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/vendor/login', pathMatch: 'full' },
  {
    path: 'vendor/login',
    loadComponent: () =>
      import('./vendor/login/vendor-login.component').then(m => m.VendorLoginComponent)
  },
  {
    path: 'vendor/dashboard',
    loadComponent: () =>
      import('./vendor/dashboard/vendor-dashboard.component').then(m => m.VendorDashboardComponent)
  },
  {
    path: 'vendor/profile',
    loadComponent: () =>
      import('./vendor/profile/vendor-profile.component').then(m => m.VendorProfileComponent)
  },
  {
    path: 'vendor/rfq',
    loadComponent: () =>
      import('./vendor/rfq/vendor-rfq-table.component').then(m => m.VendorRfqTableComponent)
  },
  {
    path: 'vendor/po',
    loadComponent: () =>
      import('./vendor/po/vendor-po-table.component').then(m => m.VendorPoTableComponent)
  },
  {
    path: 'vendor/gr',
    loadComponent: () =>
      import('./vendor/gr/vendor-gr-table.component').then(m => m.VendorGrTableComponent)
  },
  {
    path: 'vendor/financials',
    loadComponent: () =>
      import('./vendor/financials/vendor-financials-table.component').then(m => m.VendorFinancialsTableComponent)
  },
  { path: '**', redirectTo: '/vendor/login' }
];
