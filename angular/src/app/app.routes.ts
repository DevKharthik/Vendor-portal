import { Routes } from '@angular/router';
import { AuthGuard } from './vendor/auth.guard'; // 👈 Import guard

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
      import('./vendor/dashboard/vendor-dashboard.component').then(m => m.VendorDashboardComponent),
    canActivate: [AuthGuard] // ✅ Protect this route
  },
  {
    path: 'vendor/profile',
    loadComponent: () =>
      import('./vendor/profile/vendor-profile.component').then(m => m.VendorProfileComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendor/rfq',
    loadComponent: () =>
      import('./vendor/rfq/vendor-rfq-table.component').then(m => m.VendorRfqTableComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendor/po',
    loadComponent: () =>
      import('./vendor/po/vendor-po-table.component').then(m => m.VendorPoTableComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendor/gr',
    loadComponent: () =>
      import('./vendor/gr/vendor-gr-table.component').then(m => m.VendorGrTableComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendor/financials',
    loadComponent: () =>
      import('./vendor/financials/vendor-financials-table.component').then(m => m.VendorFinancialsTableComponent),
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: '/vendor/login' }
];
