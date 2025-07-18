import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  VendorLogin, 
  VendorProfile, 
  RFQ, 
  PurchaseOrder, 
  GoodsReceipt, 
   Invoice, 
  Payment, 
  Memo,
  DashboardTile 
} from './vendor.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private baseUrl = '/sap/opu/odata/sap/ZVENDOR_632_SRV';
  private currentVendorId: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: VendorLogin): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/vendor/login', {
      VENDOR_ID: credentials.VENDOR_ID,
      PASSWORD: credentials.PASSWORD
    });
  }

 setCurrentVendorId(id: string): void {
  this.currentVendorId = id;
  localStorage.setItem('vendorId', id); // ✅ store in localStorage
}

 getCurrentVendorId(): string | null {
  if (!this.currentVendorId) {
    this.currentVendorId = localStorage.getItem('vendorId'); // ✅ read from localStorage
  }
  return this.currentVendorId;
}

 logout(): void {
  this.currentVendorId = null;
  localStorage.removeItem('vendorId'); // ✅ clear it
  this.router.navigate(['/vendor/login']);
}

  getVendorProfile(vendorId: string): Observable<VendorProfile> {
    return this.http.get<{ success: boolean; data: VendorProfile }>(
      `http://localhost:5000/api/vendor/profile/${vendorId}`
    ).pipe(map(response => response.data));
  }

  // Dashboard Tiles
  getDashboardTiles(): Observable<DashboardTile[]> {
    const tiles: DashboardTile[] = [
      { title: 'Request for Quotation', icon: '📄', count: 12, route: '/vendor/rfq', color: '#3b82f6' },
      { title: 'Purchase Orders', icon: '📦', count: 8, route: '/vendor/po', color: '#10b981' },
      { title: 'Goods Receipt', icon: '📥', count: 5, route: '/vendor/gr', color: '#f59e0b' },
      { title: 'Invoice', icon: '💰', count: 15, route: '/vendor/invoice', color: '#8b5cf6' }
    ];
    return of(tiles).pipe(delay(500));
  }

  // RFQ Data
getRFQList(): Observable<RFQ[]> {
  const vendorId = this.getCurrentVendorId();
  if (!vendorId) {
    return of([]); // or throw error
  }

  return this.http.get<{ success: boolean; data: RFQ[] }>(
    `http://localhost:5000/api/vendor/rfq/${vendorId}`
  ).pipe(map(res => res.data));
}

  // Purchase Orders
 getPOList(): Observable<PurchaseOrder[]> {
  const vendorId = this.getCurrentVendorId();
  if (!vendorId) {
    return of([]);
  }

  return this.http.get<{ success: boolean; data: PurchaseOrder[] }>(
    `http://localhost:5000/api/vendor/po/${vendorId}`
  ).pipe(map(res => res.data));
}

  // Goods Receipt
getGrList(): Observable<GoodsReceipt[]> {
  const vendorId = this.getCurrentVendorId();
  if (!vendorId) {
    return of([]); // or throw error
  }

  return this.http.get<{ success: boolean; data: GoodsReceipt[] }>(
    `http://localhost:5000/api/vendor/gr/${vendorId}`
  ).pipe(map(res => res.data));
}


  getInvoice(): Observable< Invoice[]> {
  const vendorId = this.getCurrentVendorId();
  if (!vendorId) {
    return of([]); // or throw error
  }

  return this.http.get<{ success: boolean; data:  Invoice[] }>(
    `http://localhost:5000/api/vendor/invoice/${vendorId}`
  ).pipe(map(res => res.data));
}


  getPayments(): Observable<Payment[]> {
    const mockPayments: Payment[] = [
      { paymentNo: 'PAY001', invoiceNo: 'INV001', amount: 12500.00, paymentDate: new Date('2024-01-30'), method: 'Bank Transfer', status: 'Completed', agingDays: 0 },
      { paymentNo: 'PAY002', invoiceNo: 'INV002', amount: 3100.00, paymentDate: new Date('2024-02-05'), method: 'Check', status: 'Pending', agingDays: 5 }
    ];
    return of(mockPayments).pipe(delay(800));
  }

  getMemos(): Observable<Memo[]> {
    const mockMemos: Memo[] = [
      { memoNo: 'MEMO001', type: 'Credit', amount: 500.00, reason: 'Quality discount', date: new Date('2024-01-20'), status: 'Approved' },
      { memoNo: 'MEMO002', type: 'Debit', amount: 250.00, reason: 'Late delivery penalty', date: new Date('2024-01-25'), status: 'Pending' },
      { memoNo: 'MEMO003', type: 'Credit', amount: 750.00, reason: 'Volume discount', date: new Date('2024-02-01'), status: 'Approved' }
    ];
    return of(mockMemos).pipe(delay(800));
  }
}
