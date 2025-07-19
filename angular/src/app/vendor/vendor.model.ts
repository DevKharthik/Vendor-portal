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
  Lifnr: string;         // Vendor ID
  Ebeln: string;         // RFQ Number
  Aedat: string;         // Changed Date
  Bedat: string;         // Created Date
  Ekorg: string;         // Purchasing Org
  Matnr: string;         // Material Number
  Ktmng: number;         // Quantity
  Netpr: number;         // Net Price
  Statu: string;         // Status
  Txz01: string;         // Description
  Bstyp: string;         // PO Type / UOM if applicable
}


export interface PurchaseOrder {
  Lifnr: string;         // Vendor ID
  Ebeln: string;         // RFQ Number
  Aedat: string;         // Changed Date
  Bedat: string;         // Created Date
  Ekorg: string;         // Purchasing Org
  Matnr: string;         // Material Number
  Ktmng: number;         // Quantity
  Netpr: number;         // Net Price
  Statu: string;         // Status
  Txz01: string;         // Description
  Bstyp: string;         // PO Type / UOM if applicable
}

export interface GoodsReceipt {
  Mblnr: string;         // Material Document Number (e.g., "5000000001")
  Mjahr: string;         // Fiscal Year (e.g., "2025")
  Matnr: string;         // Material Number (e.g., "13")
  Menge: string;         // Quantity (e.g., "5.000") – use `number` if you parse it
  Werks: string;         // Plant (e.g., "1009")
  Meins: string;         // Unit of Measure (e.g., "KG")
  BudatMkpf: string;     // Posting Date (e.g., "2025-06-02T00:00:00") – use `Date` if parsed
  Lifnr: string;  
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