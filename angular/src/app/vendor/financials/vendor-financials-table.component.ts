import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { Invoice, Payment, Memo } from '../vendor.model';

@Component({
  selector: 'app-vendor-financials-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-financials-table.component.html',
  styleUrls: ['./vendor-financials-table.component.css']
})
export class VendorFinancialsTableComponent implements OnInit {
  invoices: Invoice[] = [];
  payments: Payment[] = [];
  memos: Memo[] = [];
  
  activeTab: 'invoices' | 'payments' | 'memos' = 'invoices';
  isLoading = true;
  error: string | null = null;

  constructor(
    private vendorService: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const vendorId = this.vendorService.getCurrentVendorId();
    
    if (!vendorId) {
      this.router.navigate(['/vendor/login']);
      return;
    }

    this.loadFinancialData();
  }

  loadFinancialData(): void {
    this.isLoading = true;
    
    const invoices$ = this.vendorService.getInvoices();
    const payments$ = this.vendorService.getPayments();
    const memos$ = this.vendorService.getMemos();

    Promise.all([
      invoices$.toPromise(),
      payments$.toPromise(),
      memos$.toPromise()
    ]).then(([invoices, payments, memos]) => {
      this.invoices = invoices || [];
      this.payments = payments || [];
      this.memos = memos || [];
      this.isLoading = false;
    }).catch((error) => {
      console.error('Error loading financial data:', error);
      this.error = 'Failed to load financial data';
      this.isLoading = false;
    });
  }

  setActiveTab(tab: 'invoices' | 'payments' | 'memos'): void {
    this.activeTab = tab;
  }

  goBack(): void {
    this.router.navigate(['/vendor/dashboard']);
  }

  getInvoiceStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'overdue': return 'status-overdue';
      default: return '';
    }
  }

  getPaymentStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      default: return '';
    }
  }

  getMemoStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  }

  getMemoTypeClass(type: string): string {
    return type.toLowerCase() === 'credit' ? 'memo-credit' : 'memo-debit';
  }
}