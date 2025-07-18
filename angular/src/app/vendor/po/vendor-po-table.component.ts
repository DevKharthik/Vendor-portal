import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { PurchaseOrder } from '../vendor.model';

@Component({
  selector: 'app-vendor-po-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-po-table.component.html',
  styleUrls: ['./vendor-po-table.component.css']
})
export class VendorPoTableComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
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

    this.loadPurchaseOrders();
  }

  loadPurchaseOrders(): void {
    this.vendorService.getPOList().subscribe({
      next: (pos) => {
        this.purchaseOrders = pos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading Purchase Orders:', error);
        this.error = 'Failed to load Purchase Order data';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vendor/dashboard']);
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'status-confirmed';
      case 'in progress': return 'status-progress';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }
}