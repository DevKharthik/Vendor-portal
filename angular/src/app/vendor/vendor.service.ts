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
      { title: 'Financials', icon: '💰', count: 15, route: '/vendor/financials', color: '#8b5cf6' }
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
    const mockPOs: PurchaseOrder[] = [
      { poNo: 'PO001', item: 'ITEM001', description: 'Steel Sheets 2mm', quantity: 100, uom: 'PC', unitPrice: 250.00, totalAmount: 25000.00, poDate: new Date('2024-01-10'), deliveryDate: new Date('2024-02-10'), status: 'Confirmed' },
      { poNo: 'PO002', item: 'ITEM002', description: 'Copper Wire 10mm', quantity: 200, uom: 'M', unitPrice: 15.50, totalAmount: 3100.00, poDate: new Date('2024-01-12'), deliveryDate: new Date('2024-02-12'), status: 'In Progress' },
      { poNo: 'PO003', item: 'ITEM003', description: 'Aluminum Rods 5mm', quantity: 75, uom: 'KG', unitPrice: 120.00, totalAmount: 9000.00, poDate: new Date('2024-01-15'), deliveryDate: new Date('2024-02-15'), status: 'Delivered' }
    ];
    return of(mockPOs).pipe(delay(800));
  }

  // Goods Receipt
  getGRList(): Observable<GoodsReceipt[]> {
    const mockGRs: GoodsReceipt[] = [
      { grNo: 'GR001', poNo: 'PO001', material: 'MAT001', description: 'Steel Sheets 2mm', quantity: 50, uom: 'PC', receivedDate: new Date('2024-01-25'), receivedBy: 'John Doe', status: 'Completed' },
      { grNo: 'GR002', poNo: 'PO002', material: 'MAT002', description: 'Copper Wire 10mm', quantity: 100, uom: 'M', receivedDate: new Date('2024-01-28'), receivedBy: 'Jane Smith', status: 'Partial' },
      { grNo: 'GR003', poNo: 'PO003', material: 'MAT003', description: 'Aluminum Rods 5mm', quantity: 75, uom: 'KG', receivedDate: new Date('2024-02-01'), receivedBy: 'Mike Johnson', status: 'Completed' }
    ];
    return of(mockGRs).pipe(delay(800));
  }

  // Financials
  getInvoices(): Observable<Invoice[]> {
    const mockInvoices: Invoice[] = [
      { invoiceNo: 'INV001', poNo: 'PO001', amount: 12500.00, invoiceDate: new Date('2024-01-26'), dueDate: new Date('2024-02-25'), status: 'Paid' },
      { invoiceNo: 'INV002', poNo: 'PO002', amount: 3100.00, invoiceDate: new Date('2024-01-28'), dueDate: new Date('2024-02-27'), status: 'Pending' },
      { invoiceNo: 'INV003', poNo: 'PO003', amount: 9000.00, invoiceDate: new Date('2024-02-02'), dueDate: new Date('2024-03-03'), status: 'Overdue' }
    ];
    return of(mockInvoices).pipe(delay(800));
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
