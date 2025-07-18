export interface VendorLogin {
  VENDOR_ID: string;
  PASSWORD: string;
}

export interface VendorProfile {
  Lifnr: string;
  Name1: string;
  Land1: string;
  Ort01: string;
  Stras: string;
  Pstlz: string;
}
export interface RFQ {
  rfqNo: string;
  material: string;
  description: string;
  quantity: number;
  uom: string;
  dueDate: Date;
  status: string;
  createdDate: Date;
}

export interface PurchaseOrder {
  poNo: string;
  item: string;
  description: string;
  quantity: number;
  uom: string;
  unitPrice: number;
  totalAmount: number;
  poDate: Date;
  deliveryDate: Date;
  status: string;
}

export interface GoodsReceipt {
  grNo: string;
  poNo: string;
  material: string;
  description: string;
  quantity: number;
  uom: string;
  receivedDate: Date;
  receivedBy: string;
  status: string;
}

export interface Invoice {
  invoiceNo: string;
  poNo: string;
  amount: number;
  invoiceDate: Date;
  dueDate: Date;
  status: string;
}

export interface Payment {
  paymentNo: string;
  invoiceNo: string;
  amount: number;
  paymentDate: Date;
  method: string;
  status: string;
  agingDays: number;
}

export interface Memo {
  memoNo: string;
  type: 'Credit' | 'Debit';
  amount: number;
  reason: string;
  date: Date;
  status: string;
}

export interface DashboardTile {
  title: string;
  icon: string;
  count: number;
  route: string;
  color: string;
}