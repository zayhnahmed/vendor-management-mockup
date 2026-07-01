/**
 * Mock seed data for the Arbhasoft vendor-management mockup.
 * Realistic Saudi / UAE procurement operation.
 */

export type PartyRole = "buyer" | "vendor" | "admin";

export interface OrgUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
  organization: Organization;
}

export interface Organization {
  id: string;
  name: string;
  short: string;
  country: string;
  city: string;
  isBuyer: boolean;
  isVendor: boolean;
}

export type RfqStatus =
  | "DRAFT"
  | "DISTRIBUTED"
  | "QUOTED"
  | "AWARDED"
  | "CANCELLED";

export interface RfqSummary {
  id: string;
  reference: string;
  title: string;
  status: RfqStatus;
  createdOn: string;
  submissionDeadline: string;
  totalValue: number;
  currency: string;
  vendorsSelected: number;
  quotesReceived: number;
}

export interface Party {
  organizationName: string;
  contactName: string;
  contactRole: string;
  city: string;
  country: string;
}

export interface RfqLineItem {
  no: number;
  materialNumber: string;
  description: string;
  quantity: number;
  unit: string;
  targetUnitPrice: number;
  lineTotal: number;
}

export interface RfqDetail extends RfqSummary {
  buyer: Party;
  vendor: Party;
  items: RfqLineItem[];
  termsSummary: string;
  deliveryLocation: string;
  quotes: RfqQuote[];
}

export interface RfqQuote {
  vendorName: string;
  totalPrice: number;
  leadTimeDays: number;
  status: "SUBMITTED" | "PENDING" | "DECLINED";
}

export interface VendorSummary {
  id: string;
  name: string;
  city: string;
  country: string;
  onboardingStatus: "PENDING" | "ONBOARDED" | "AWAITING";
  activeRfqs: number;
  rating: number;
}

export interface PendingOrg {
  id: string;
  name: string;
  country: string;
  requestedRoles: ("BUYER" | "VENDOR")[];
  submittedOn: string;
  contactName: string;
}

export interface ActivityItem {
  id: string;
  actorName: string;
  action: string;
  target: string;
  timestamp: string;
  type: "rfq" | "po" | "invoice" | "onboarding";
}

/* =========================================================================
 * SEED
 * ======================================================================= */

export const BUYER_USER: OrgUser = {
  id: "usr_01",
  name: "Ahmed Kassim",
  email: "ahmed.kassim@northharbor.sa",
  initials: "AK",
  role: "Procurement Manager",
  organization: {
    id: "org_nh",
    name: "North Harbor Trading Co.",
    short: "NHT",
    country: "Saudi Arabia",
    city: "Riyadh",
    isBuyer: true,
    isVendor: false,
  },
};

export const VENDOR_USER: OrgUser = {
  id: "usr_02",
  name: "Fatima Al-Hashemi",
  email: "fatima@emiratessteel.ae",
  initials: "FA",
  role: "Key Accounts Lead",
  organization: {
    id: "org_es",
    name: "Emirates Steel Co.",
    short: "ESC",
    country: "UAE",
    city: "Dubai",
    isBuyer: false,
    isVendor: true,
  },
};

export const ADMIN_USER: OrgUser = {
  id: "usr_00",
  name: "Sarah Mansour",
  email: "sarah@arbhasoft.com",
  initials: "SM",
  role: "Platform Administrator",
  organization: {
    id: "org_arbha",
    name: "Arbhasoft",
    short: "ARB",
    country: "UAE",
    city: "Dubai",
    isBuyer: false,
    isVendor: false,
  },
};

export const RECENT_RFQS: RfqSummary[] = [
  {
    id: "rfq_007",
    reference: "NHT-24-0007",
    title: "Steel bearings & industrial lubricants — Q4 sourcing",
    status: "DISTRIBUTED",
    createdOn: "2026-09-12",
    submissionDeadline: "2026-09-26",
    totalValue: 34125,
    currency: "SAR",
    vendorsSelected: 4,
    quotesReceived: 2,
  },
  {
    id: "rfq_006",
    reference: "NHT-24-0006",
    title: "Warehouse LED lighting retrofit — 12,000 sqm facility",
    status: "AWARDED",
    createdOn: "2026-09-04",
    submissionDeadline: "2026-09-15",
    totalValue: 58900,
    currency: "SAR",
    vendorsSelected: 3,
    quotesReceived: 3,
  },
  {
    id: "rfq_005",
    reference: "NHT-24-0005",
    title: "Office IT peripherals — headquarters refresh",
    status: "QUOTED",
    createdOn: "2026-08-28",
    submissionDeadline: "2026-09-10",
    totalValue: 21740,
    currency: "SAR",
    vendorsSelected: 5,
    quotesReceived: 4,
  },
  {
    id: "rfq_004",
    reference: "NHT-24-0004",
    title: "Cement bulk delivery — Q4 construction contract",
    status: "DISTRIBUTED",
    createdOn: "2026-08-22",
    submissionDeadline: "2026-09-05",
    totalValue: 142000,
    currency: "SAR",
    vendorsSelected: 6,
    quotesReceived: 3,
  },
  {
    id: "rfq_003",
    reference: "NHT-24-0003",
    title: "Safety equipment restock — hard hats, gloves, harnesses",
    status: "DRAFT",
    createdOn: "2026-08-15",
    submissionDeadline: "2026-08-30",
    totalValue: 0,
    currency: "SAR",
    vendorsSelected: 0,
    quotesReceived: 0,
  },
];

export const TOP_VENDORS: VendorSummary[] = [
  {
    id: "ven_es",
    name: "Emirates Steel Co.",
    city: "Dubai",
    country: "UAE",
    onboardingStatus: "ONBOARDED",
    activeRfqs: 2,
    rating: 4.8,
  },
  {
    id: "ven_dc",
    name: "Delta Cement Ltd.",
    city: "Jeddah",
    country: "Saudi Arabia",
    onboardingStatus: "ONBOARDED",
    activeRfqs: 1,
    rating: 4.6,
  },
  {
    id: "ven_gos",
    name: "Gulf Office Supplies",
    city: "Riyadh",
    country: "Saudi Arabia",
    onboardingStatus: "AWAITING",
    activeRfqs: 1,
    rating: 4.3,
  },
  {
    id: "ven_rls",
    name: "Riyadh Lighting Solutions",
    city: "Riyadh",
    country: "Saudi Arabia",
    onboardingStatus: "ONBOARDED",
    activeRfqs: 0,
    rating: 4.7,
  },
];

export const RFQ_DETAIL_FEATURED: RfqDetail = {
  id: "rfq_007",
  reference: "NHT-24-0007",
  title: "Steel bearings & industrial lubricants — Q4 sourcing",
  status: "DISTRIBUTED",
  createdOn: "2026-09-12",
  submissionDeadline: "2026-09-26",
  totalValue: 34125,
  currency: "SAR",
  vendorsSelected: 4,
  quotesReceived: 2,
  buyer: {
    organizationName: "North Harbor Trading Co.",
    contactName: "Ahmed Kassim",
    contactRole: "Procurement Manager",
    city: "Riyadh",
    country: "Saudi Arabia",
  },
  vendor: {
    organizationName: "Emirates Steel Co.",
    contactName: "Fatima Al-Hashemi",
    contactRole: "Key Accounts Lead",
    city: "Dubai",
    country: "UAE",
  },
  items: [
    {
      no: 1,
      materialNumber: "BRG-6206-2RS",
      description: "6206-2RS sealed deep-groove ball bearing, 30×62×16 mm",
      quantity: 2000,
      unit: "EA",
      targetUnitPrice: 12.0,
      lineTotal: 24000,
    },
    {
      no: 2,
      materialNumber: "BRG-6208-FL",
      description: "6208 flanged deep-groove ball bearing, 40×80×18 mm",
      quantity: 500,
      unit: "EA",
      targetUnitPrice: 18.5,
      lineTotal: 9250,
    },
    {
      no: 3,
      materialNumber: "LUB-NLGI2-1KG",
      description: "Multi-purpose grease NLGI Grade 2, lithium complex",
      quantity: 100,
      unit: "KG",
      targetUnitPrice: 8.75,
      lineTotal: 875,
    },
  ],
  termsSummary:
    "Net-30 payment · DDP Riyadh warehouse · Origin certificate required",
  deliveryLocation: "North Harbor Central Warehouse · Riyadh Industrial City",
  quotes: [
    {
      vendorName: "Emirates Steel Co.",
      totalPrice: 32450,
      leadTimeDays: 14,
      status: "SUBMITTED",
    },
    {
      vendorName: "Al-Rashid Industrial Supply",
      totalPrice: 33900,
      leadTimeDays: 10,
      status: "SUBMITTED",
    },
    {
      vendorName: "Gulf Bearing Partners",
      totalPrice: 0,
      leadTimeDays: 0,
      status: "PENDING",
    },
    {
      vendorName: "Riyadh Metal Trading",
      totalPrice: 0,
      leadTimeDays: 0,
      status: "PENDING",
    },
  ],
};

export const BUYER_KPIS = {
  openRfqs: 4,
  pendingOrders: 7,
  invoicesDue: 24300,
  vendorsActive: 28,
};

export const VENDOR_KPIS = {
  newRfqs: 5,
  quotesSubmitted: 12,
  activeOrders: 8,
  pendingPayment: 47500,
};

export const ADMIN_KPIS = {
  totalOrgs: 142,
  pendingApprovals: 6,
  activeBuyers: 78,
  activeVendors: 64,
};

export const PENDING_ORGS: PendingOrg[] = [
  {
    id: "org_pend_01",
    name: "Al-Faisaliah Trading Group",
    country: "Saudi Arabia",
    requestedRoles: ["BUYER"],
    submittedOn: "2026-06-28",
    contactName: "Khalid Al-Rashid",
  },
  {
    id: "org_pend_02",
    name: "Peninsula Industrial Supplies",
    country: "UAE",
    requestedRoles: ["VENDOR"],
    submittedOn: "2026-06-27",
    contactName: "Mariam Hassan",
  },
  {
    id: "org_pend_03",
    name: "Red Sea Logistics Co.",
    country: "Saudi Arabia",
    requestedRoles: ["BUYER", "VENDOR"],
    submittedOn: "2026-06-25",
    contactName: "Omar Zaki",
  },
  {
    id: "org_pend_04",
    name: "Emirates Bearing House",
    country: "UAE",
    requestedRoles: ["VENDOR"],
    submittedOn: "2026-06-24",
    contactName: "Salim Al-Khoury",
  },
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "act_1",
    actorName: "Emirates Steel Co.",
    action: "submitted a quote on",
    target: "NHT-24-0007",
    timestamp: "12 min ago",
    type: "rfq",
  },
  {
    id: "act_2",
    actorName: "Delta Cement Ltd.",
    action: "acknowledged",
    target: "PO-2026-045",
    timestamp: "1 hour ago",
    type: "po",
  },
  {
    id: "act_3",
    actorName: "Gulf Office Supplies",
    action: "raised invoice",
    target: "INV-004123",
    timestamp: "3 hours ago",
    type: "invoice",
  },
  {
    id: "act_4",
    actorName: "Riyadh Lighting Solutions",
    action: "completed onboarding step 2 of 3",
    target: "",
    timestamp: "yesterday",
    type: "onboarding",
  },
];

// ==========================================================================
// PURCHASE ORDERS
// ==========================================================================
export type PoStatus = "DRAFT" | "ISSUED" | "ACKNOWLEDGED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface PurchaseOrder {
  id: string;
  reference: string;
  vendor: string;
  city: string;
  items: number;
  total: number;
  currency: string;
  issuedOn: string;
  expectedDelivery: string;
  status: PoStatus;
}

export const PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: "po_045", reference: "PO-2026-045", vendor: "Emirates Steel Co.", city: "Dubai", items: 3, total: 32450, currency: "SAR", issuedOn: "2026-06-25", expectedDelivery: "2026-07-09", status: "SHIPPED" },
  { id: "po_044", reference: "PO-2026-044", vendor: "Delta Cement Ltd.", city: "Jeddah", items: 2, total: 142000, currency: "SAR", issuedOn: "2026-06-22", expectedDelivery: "2026-07-05", status: "ACKNOWLEDGED" },
  { id: "po_043", reference: "PO-2026-043", vendor: "Gulf Office Supplies", city: "Riyadh", items: 12, total: 21740, currency: "SAR", issuedOn: "2026-06-18", expectedDelivery: "2026-06-30", status: "DELIVERED" },
  { id: "po_042", reference: "PO-2026-042", vendor: "Riyadh Lighting Solutions", city: "Riyadh", items: 8, total: 58900, currency: "SAR", issuedOn: "2026-06-15", expectedDelivery: "2026-07-01", status: "ISSUED" },
  { id: "po_041", reference: "PO-2026-041", vendor: "SafetyFirst Industrial", city: "Dammam", items: 5, total: 14300, currency: "SAR", issuedOn: "2026-06-12", expectedDelivery: "2026-06-26", status: "DELIVERED" },
  { id: "po_040", reference: "PO-2026-040", vendor: "Al-Waha Fuels", city: "Riyadh", items: 1, total: 89000, currency: "SAR", issuedOn: "2026-06-08", expectedDelivery: "2026-06-25", status: "DELIVERED" },
  { id: "po_039", reference: "PO-2026-039", vendor: "Peninsula Industrial", city: "Sharjah", items: 4, total: 26100, currency: "SAR", issuedOn: "2026-06-05", expectedDelivery: "2026-06-20", status: "DRAFT" },
];

// ==========================================================================
// INVOICES
// ==========================================================================
export type InvoiceStatus = "PENDING" | "PAID" | "OVERDUE" | "CANCELLED";

export interface Invoice {
  id: string;
  reference: string;
  poReference: string;
  vendor: string;
  amount: number;
  currency: string;
  issuedOn: string;
  dueDate: string;
  status: InvoiceStatus;
}

export const INVOICES: Invoice[] = [
  { id: "inv_1", reference: "INV-004123", poReference: "PO-2026-043", vendor: "Gulf Office Supplies", amount: 21740, currency: "SAR", issuedOn: "2026-06-30", dueDate: "2026-07-30", status: "PENDING" },
  { id: "inv_2", reference: "INV-004122", poReference: "PO-2026-041", vendor: "SafetyFirst Industrial", amount: 14300, currency: "SAR", issuedOn: "2026-06-26", dueDate: "2026-07-26", status: "PENDING" },
  { id: "inv_3", reference: "INV-004121", poReference: "PO-2026-040", vendor: "Al-Waha Fuels", amount: 89000, currency: "SAR", issuedOn: "2026-06-25", dueDate: "2026-07-25", status: "PENDING" },
  { id: "inv_4", reference: "INV-004115", poReference: "PO-2026-038", vendor: "Emirates Steel Co.", amount: 42800, currency: "SAR", issuedOn: "2026-05-15", dueDate: "2026-06-14", status: "OVERDUE" },
  { id: "inv_5", reference: "INV-004108", poReference: "PO-2026-035", vendor: "Delta Cement Ltd.", amount: 68000, currency: "SAR", issuedOn: "2026-05-05", dueDate: "2026-06-04", status: "PAID" },
  { id: "inv_6", reference: "INV-004102", poReference: "PO-2026-033", vendor: "Riyadh Lighting Solutions", amount: 34500, currency: "SAR", issuedOn: "2026-04-28", dueDate: "2026-05-28", status: "PAID" },
];

// ==========================================================================
// MATERIALS
// ==========================================================================
export type MaterialType = "BUY" | "SELL" | "BOTH";

export interface Material {
  id: string;
  code: string;
  description: string;
  type: MaterialType;
  category: string;
  unit: string;
  lastPrice: number;
  currency: string;
  lastOrdered: string;
}

export const MATERIALS: Material[] = [
  { id: "m_1", code: "BRG-6206-2RS", description: "6206-2RS sealed deep-groove ball bearing, 30×62×16 mm", type: "BUY", category: "Bearings", unit: "EA", lastPrice: 12.00, currency: "SAR", lastOrdered: "2026-06-25" },
  { id: "m_2", code: "BRG-6208-FL", description: "6208 flanged deep-groove ball bearing, 40×80×18 mm", type: "BUY", category: "Bearings", unit: "EA", lastPrice: 18.50, currency: "SAR", lastOrdered: "2026-06-25" },
  { id: "m_3", code: "LUB-NLGI2-1KG", description: "Multi-purpose grease NLGI Grade 2, lithium complex", type: "BUY", category: "Lubricants", unit: "KG", lastPrice: 8.75, currency: "SAR", lastOrdered: "2026-06-25" },
  { id: "m_4", code: "CEM-OPC-50KG", description: "Portland cement OPC 42.5N, 50 kg sack", type: "BUY", category: "Construction", unit: "BAG", lastPrice: 24.00, currency: "SAR", lastOrdered: "2026-06-22" },
  { id: "m_5", code: "LED-PNL-600", description: "LED panel light 600×600 mm, 45W, 4000K neutral white", type: "BUY", category: "Electrical", unit: "EA", lastPrice: 145.00, currency: "SAR", lastOrdered: "2026-06-15" },
  { id: "m_6", code: "PPE-HH-CL2", description: "Hard hat Class E, ANSI Z89.1-2014 certified", type: "BUY", category: "Safety", unit: "EA", lastPrice: 32.50, currency: "SAR", lastOrdered: "2026-05-28" },
  { id: "m_7", code: "PPE-GLV-NIT", description: "Nitrile gloves industrial 8 mil, powder-free, box 100", type: "BUY", category: "Safety", unit: "BOX", lastPrice: 68.00, currency: "SAR", lastOrdered: "2026-05-28" },
  { id: "m_8", code: "FUEL-DSL-BLK", description: "Diesel bulk delivery, EN 590 standard, min 5,000 L", type: "BUY", category: "Fuel", unit: "L", lastPrice: 2.18, currency: "SAR", lastOrdered: "2026-06-08" },
];

// ==========================================================================
// CONNECTIONS
// ==========================================================================
export type ConnectionType = "VENDOR" | "BUYER" | "PARTNER";
export type ConnectionStatus = "ACTIVE" | "PAUSED";

export interface Connection {
  id: string;
  organizationName: string;
  city: string;
  country: string;
  type: ConnectionType;
  connectedSince: string;
  activeDeals: number;
  status: ConnectionStatus;
  category: string;
}

export const ACTIVE_CONNECTIONS: Connection[] = [
  { id: "c_1", organizationName: "Emirates Steel Co.", city: "Dubai", country: "UAE", type: "VENDOR", connectedSince: "2025-11-04", activeDeals: 3, status: "ACTIVE", category: "Steel & Metals" },
  { id: "c_2", organizationName: "Delta Cement Ltd.", city: "Jeddah", country: "Saudi Arabia", type: "VENDOR", connectedSince: "2025-09-18", activeDeals: 2, status: "ACTIVE", category: "Construction" },
  { id: "c_3", organizationName: "Gulf Office Supplies", city: "Riyadh", country: "Saudi Arabia", type: "VENDOR", connectedSince: "2026-01-22", activeDeals: 1, status: "ACTIVE", category: "Office" },
  { id: "c_4", organizationName: "Riyadh Lighting Solutions", city: "Riyadh", country: "Saudi Arabia", type: "VENDOR", connectedSince: "2026-02-11", activeDeals: 1, status: "ACTIVE", category: "Electrical" },
  { id: "c_5", organizationName: "SafetyFirst Industrial", city: "Dammam", country: "Saudi Arabia", type: "VENDOR", connectedSince: "2025-12-01", activeDeals: 2, status: "ACTIVE", category: "Safety Equipment" },
  { id: "c_6", organizationName: "Al-Waha Fuels", city: "Riyadh", country: "Saudi Arabia", type: "VENDOR", connectedSince: "2025-08-05", activeDeals: 1, status: "ACTIVE", category: "Fuel & Energy" },
];

export interface ConnectionRequest {
  id: string;
  organizationName: string;
  city: string;
  country: string;
  type: ConnectionType;
  message: string;
  sentOn: string;
  direction: "INCOMING" | "OUTGOING";
  category: string;
}

export const CONNECTION_REQUESTS: ConnectionRequest[] = [
  { id: "cr_1", organizationName: "Peninsula Industrial Supplies", city: "Sharjah", country: "UAE", type: "VENDOR", message: "We would like to supply industrial components for your Q4 operations.", sentOn: "2026-06-28", direction: "INCOMING", category: "Industrial" },
  { id: "cr_2", organizationName: "Al-Rashid Bearing House", city: "Dammam", country: "Saudi Arabia", type: "VENDOR", message: "Specialized in high-precision bearings, would love to connect.", sentOn: "2026-06-25", direction: "INCOMING", category: "Bearings" },
  { id: "cr_3", organizationName: "Red Sea Logistics", city: "Yanbu", country: "Saudi Arabia", type: "PARTNER", message: "Interested in a logistics partnership for your bulk deliveries.", sentOn: "2026-06-22", direction: "INCOMING", category: "Logistics" },
  { id: "cr_4", organizationName: "Kuwait Steel Traders", city: "Kuwait City", country: "Kuwait", type: "VENDOR", message: "Sent connection request.", sentOn: "2026-06-20", direction: "OUTGOING", category: "Steel & Metals" },
  { id: "cr_5", organizationName: "Bahrain Industrial Chemicals", city: "Manama", country: "Bahrain", type: "VENDOR", message: "Sent connection request.", sentOn: "2026-06-17", direction: "OUTGOING", category: "Chemicals" },
];

// ==========================================================================
// DISCOVERY — public org profiles
// ==========================================================================
export interface DiscoveryOrg {
  id: string;
  name: string;
  city: string;
  country: string;
  type: "VENDOR" | "BUYER";
  category: string;
  rating: number;
  reviews: number;
  yearsOnPlatform: number;
  description: string;
  verified: boolean;
}

export const DISCOVERY_ORGS: DiscoveryOrg[] = [
  { id: "d_1", name: "Arabian Steel Mills", city: "Jubail", country: "Saudi Arabia", type: "VENDOR", category: "Steel & Metals", rating: 4.9, reviews: 128, yearsOnPlatform: 3, description: "Producer of high-grade structural steel serving construction and industrial sectors across the GCC.", verified: true },
  { id: "d_2", name: "Nordic Industrial Fasteners", city: "Riyadh", country: "Saudi Arabia", type: "VENDOR", category: "Fasteners & Bolts", rating: 4.7, reviews: 89, yearsOnPlatform: 2, description: "Specialised in stainless steel and titanium fasteners for demanding applications.", verified: true },
  { id: "d_3", name: "Green Horizon Chemicals", city: "Dubai", country: "UAE", type: "VENDOR", category: "Chemicals", rating: 4.6, reviews: 67, yearsOnPlatform: 4, description: "Sustainable industrial chemicals and lubricants with certified green sourcing.", verified: true },
  { id: "d_4", name: "Peninsula Logistics Group", city: "Yanbu", country: "Saudi Arabia", type: "VENDOR", category: "Logistics", rating: 4.8, reviews: 156, yearsOnPlatform: 5, description: "End-to-end regional logistics, cold chain, and bonded warehousing.", verified: true },
  { id: "d_5", name: "Aramco Construction Holdings", city: "Dhahran", country: "Saudi Arabia", type: "BUYER", category: "Construction", rating: 4.9, reviews: 42, yearsOnPlatform: 6, description: "Large-scale infrastructure buyer for regional development projects.", verified: true },
  { id: "d_6", name: "Emirates Modern Manufacturing", city: "Abu Dhabi", country: "UAE", type: "BUYER", category: "Manufacturing", rating: 4.7, reviews: 38, yearsOnPlatform: 3, description: "Precision manufacturer sourcing raw materials and industrial supplies.", verified: false },
  { id: "d_7", name: "Al-Bilad Trading Corp.", city: "Riyadh", country: "Saudi Arabia", type: "BUYER", category: "General Trading", rating: 4.5, reviews: 27, yearsOnPlatform: 2, description: "Diversified trading house with active procurement across 12 categories.", verified: true },
  { id: "d_8", name: "Bahrain Petro-Services", city: "Manama", country: "Bahrain", type: "VENDOR", category: "Fuel & Energy", rating: 4.6, reviews: 94, yearsOnPlatform: 4, description: "Certified fuel and lubricant supplier with regional distribution network.", verified: true },
];

// ==========================================================================
// TASKS — approval inbox
// ==========================================================================
export type TaskType = "VENDOR_ONBOARDING" | "PO_APPROVAL" | "INVOICE_APPROVAL" | "RFQ_REVIEW";
export type TaskUrgency = "HIGH" | "MEDIUM" | "LOW";

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  actor: string;
  actorCategory: string;
  description: string;
  amount?: number;
  currency?: string;
  createdOn: string;
  dueOn: string;
  urgency: TaskUrgency;
}

export const MY_TASKS: Task[] = [
  { id: "t_1", type: "VENDOR_ONBOARDING", title: "Approve vendor onboarding", actor: "Peninsula Industrial Supplies", actorCategory: "Industrial", description: "Vendor submitted Step 3 compliance documents for your review.", createdOn: "2026-06-30", dueOn: "2026-07-04", urgency: "HIGH" },
  { id: "t_2", type: "INVOICE_APPROVAL", title: "Approve invoice for payment", actor: "Gulf Office Supplies", actorCategory: "Office", description: "Invoice INV-004123 against PO-2026-043 for SAR 21,740.", amount: 21740, currency: "SAR", createdOn: "2026-06-30", dueOn: "2026-07-03", urgency: "HIGH" },
  { id: "t_3", type: "PO_APPROVAL", title: "Approve purchase order", actor: "Al-Waha Fuels", actorCategory: "Fuel & Energy", description: "PO-2026-039 for diesel bulk delivery requires manager approval.", amount: 89000, currency: "SAR", createdOn: "2026-06-29", dueOn: "2026-07-02", urgency: "MEDIUM" },
  { id: "t_4", type: "RFQ_REVIEW", title: "Review RFQ before distribution", actor: "Draft NHT-24-0008", actorCategory: "Bearings", description: "RFQ for Q3 bearing spares needs a final review before it goes to vendors.", createdOn: "2026-06-28", dueOn: "2026-07-05", urgency: "MEDIUM" },
  { id: "t_5", type: "VENDOR_ONBOARDING", title: "Approve vendor onboarding", actor: "Al-Rashid Bearing House", actorCategory: "Bearings", description: "Vendor submitted Step 2 financial info awaiting your review.", createdOn: "2026-06-25", dueOn: "2026-07-09", urgency: "LOW" },
];

// ==========================================================================
// USERS — for org settings page
// ==========================================================================
export interface OrgMember {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
  status: "ACTIVE" | "INVITED" | "SUSPENDED";
  joinedOn: string;
  lastActive: string;
}

export const ORG_MEMBERS: OrgMember[] = [
  { id: "u_1", name: "Ahmed Kassim", email: "ahmed.kassim@northharbor.sa", initials: "AK", role: "Org Admin", status: "ACTIVE", joinedOn: "2025-02-01", lastActive: "just now" },
  { id: "u_2", name: "Layla Al-Faqih", email: "layla@northharbor.sa", initials: "LF", role: "Procurement Lead", status: "ACTIVE", joinedOn: "2025-04-14", lastActive: "1 hour ago" },
  { id: "u_3", name: "Yousef Bin Rashid", email: "yousef@northharbor.sa", initials: "YR", role: "Buyer", status: "ACTIVE", joinedOn: "2025-05-30", lastActive: "3 hours ago" },
  { id: "u_4", name: "Nadia Haddad", email: "nadia@northharbor.sa", initials: "NH", role: "Finance", status: "ACTIVE", joinedOn: "2025-08-12", lastActive: "yesterday" },
  { id: "u_5", name: "Omar Farid", email: "omar@northharbor.sa", initials: "OF", role: "Buyer", status: "INVITED", joinedOn: "2026-06-28", lastActive: "—" },
];

// ==========================================================================
// VENDOR ONBOARDING — the 3-step qualification process
// ==========================================================================
export type OnboardingStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED";

export interface OnboardingRelationship {
  id: string;
  buyerName: string;
  buyerShort: string;
  buyerCity: string;
  buyerCountry: string;
  status: OnboardingStatus;
  currentStep: 1 | 2 | 3;
  updatedOn: string;
  category: string;
}

export const VENDOR_ONBOARDINGS: OnboardingRelationship[] = [
  {
    id: "onb_nht",
    buyerName: "North Harbor Trading Co.",
    buyerShort: "NHT",
    buyerCity: "Riyadh",
    buyerCountry: "Saudi Arabia",
    status: "APPROVED",
    currentStep: 3,
    updatedOn: "2026-05-14",
    category: "Industrial Trading",
  },
  {
    id: "onb_afg",
    buyerName: "Al-Faisaliah Group",
    buyerShort: "AFG",
    buyerCity: "Riyadh",
    buyerCountry: "Saudi Arabia",
    status: "IN_PROGRESS",
    currentStep: 2,
    updatedOn: "2026-06-28",
    category: "Construction",
  },
  {
    id: "onb_gcl",
    buyerName: "Gulf Construction Ltd.",
    buyerShort: "GCL",
    buyerCity: "Jeddah",
    buyerCountry: "Saudi Arabia",
    status: "IN_PROGRESS",
    currentStep: 1,
    updatedOn: "2026-06-25",
    category: "Infrastructure",
  },
  {
    id: "onb_ach",
    buyerName: "Aramco Construction Holdings",
    buyerShort: "ACH",
    buyerCity: "Dhahran",
    buyerCountry: "Saudi Arabia",
    status: "SUBMITTED",
    currentStep: 3,
    updatedOn: "2026-06-30",
    category: "Energy Infrastructure",
  },
];

// ==========================================================================
// ONBOARDING REVIEWS (buyer side — vendor submissions to review)
// ==========================================================================
export interface OnboardingSubmission {
  id: string;
  vendorName: string;
  vendorShort: string;
  vendorCity: string;
  vendorCountry: string;
  category: string;
  submittedOn: string;
  status: "SUBMITTED" | "APPROVED" | "REJECTED";
  // Step 1
  companyLegalName: string;
  tradeName: string;
  yearOfEstablishment: number;
  entityType: string;
  registeredAddress: string;
  businessType: string[];
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  designation: string;
  // Step 2
  bankName: string;
  bankCode: string;
  accountHolderName: string;
  bankCountry: string;
  currency: string;
  taxRegistrationNumber: string;
  annualTurnover: number;
  yearsInBusiness: number;
  // Step 3
  compliesWithLaborLaws: boolean;
  hasHSEPolicy: boolean;
  hasAntiBriberyPolicy: boolean;
  hasLegalIssues: boolean;
  certifications: Array<{ name: string; issuedBy: string; validUntil: string }>;
  sustainabilityPractices: string[];
}

export const ONBOARDING_SUBMISSIONS: OnboardingSubmission[] = [
  {
    id: "sub_1",
    vendorName: "Peninsula Industrial Supplies",
    vendorShort: "PI",
    vendorCity: "Sharjah",
    vendorCountry: "UAE",
    category: "Industrial",
    submittedOn: "2026-06-30",
    status: "SUBMITTED",
    companyLegalName: "Peninsula Industrial Supplies LLC",
    tradeName: "Peninsula Industrial",
    yearOfEstablishment: 2011,
    entityType: "PRIVATE",
    registeredAddress: "Industrial Area 4, Sharjah Free Zone, Sharjah, UAE",
    businessType: ["Distributor", "Manufacturer's rep"],
    primaryContactName: "Mariam Hassan",
    primaryContactEmail: "mariam@peninsula-ind.ae",
    primaryContactPhone: "+971 6 555 8823",
    designation: "General Manager",
    bankName: "Emirates NBD",
    bankCode: "EBILAEAD",
    accountHolderName: "Peninsula Industrial Supplies LLC",
    bankCountry: "UAE",
    currency: "AED",
    taxRegistrationNumber: "100234876500003",
    annualTurnover: 18500000,
    yearsInBusiness: 15,
    compliesWithLaborLaws: true,
    hasHSEPolicy: true,
    hasAntiBriberyPolicy: true,
    hasLegalIssues: false,
    certifications: [
      { name: "ISO 9001:2015", issuedBy: "TÜV Rheinland", validUntil: "2027-04-30" },
      { name: "ISO 14001:2015", issuedBy: "Bureau Veritas", validUntil: "2026-11-15" },
    ],
    sustainabilityPractices: ["Solar-powered warehouse", "Recycling programme", "Green fleet initiative"],
  },
  {
    id: "sub_2",
    vendorName: "Al-Rashid Bearing House",
    vendorShort: "AR",
    vendorCity: "Dammam",
    vendorCountry: "Saudi Arabia",
    category: "Bearings",
    submittedOn: "2026-06-25",
    status: "SUBMITTED",
    companyLegalName: "Al-Rashid Bearing House Trading Est.",
    tradeName: "Al-Rashid Bearings",
    yearOfEstablishment: 2003,
    entityType: "PRIVATE",
    registeredAddress: "King Fahd Industrial Port Road, Dammam 32421, Saudi Arabia",
    businessType: ["Distributor", "Wholesaler"],
    primaryContactName: "Salim Al-Khoury",
    primaryContactEmail: "salim@alrashid-bearings.sa",
    primaryContactPhone: "+966 13 812 4400",
    designation: "Managing Director",
    bankName: "Saudi National Bank",
    bankCode: "NCBKSAJE",
    accountHolderName: "Al-Rashid Bearing House Trading Est.",
    bankCountry: "Saudi Arabia",
    currency: "SAR",
    taxRegistrationNumber: "300987654300003",
    annualTurnover: 8200000,
    yearsInBusiness: 23,
    compliesWithLaborLaws: true,
    hasHSEPolicy: true,
    hasAntiBriberyPolicy: true,
    hasLegalIssues: false,
    certifications: [
      { name: "ISO 9001:2015", issuedBy: "SGS", validUntil: "2028-01-20" },
    ],
    sustainabilityPractices: ["Local sourcing", "Employee training"],
  },
  {
    id: "sub_3",
    vendorName: "Kuwait Steel Traders",
    vendorShort: "KS",
    vendorCity: "Kuwait City",
    vendorCountry: "Kuwait",
    category: "Steel & Metals",
    submittedOn: "2026-06-20",
    status: "SUBMITTED",
    companyLegalName: "Kuwait Steel Traders Company W.L.L.",
    tradeName: "Kuwait Steel",
    yearOfEstablishment: 1998,
    entityType: "PRIVATE",
    registeredAddress: "Shuwaikh Industrial Area 3, Block 4, Kuwait",
    businessType: ["Trader", "Stockist"],
    primaryContactName: "Nasser Al-Sabah",
    primaryContactEmail: "nasser@kwsteel.com.kw",
    primaryContactPhone: "+965 2483 7712",
    designation: "Commercial Director",
    bankName: "National Bank of Kuwait",
    bankCode: "NBOKKWKW",
    accountHolderName: "Kuwait Steel Traders Company W.L.L.",
    bankCountry: "Kuwait",
    currency: "KWD",
    taxRegistrationNumber: "800112233400001",
    annualTurnover: 34600000,
    yearsInBusiness: 28,
    compliesWithLaborLaws: true,
    hasHSEPolicy: true,
    hasAntiBriberyPolicy: true,
    hasLegalIssues: false,
    certifications: [
      { name: "ISO 9001:2015", issuedBy: "DNV", validUntil: "2027-08-10" },
      { name: "OHSAS 45001", issuedBy: "DNV", validUntil: "2027-08-10" },
    ],
    sustainabilityPractices: ["Certified recycled steel", "Carbon accounting"],
  },
];

// ==========================================================================
// RFQ LIST — buyer side, extended with more items
// ==========================================================================
export const RFQS_BUYER_LIST: RfqSummary[] = [
  ...RECENT_RFQS,
  {
    id: "rfq_002",
    reference: "NHT-24-0002",
    title: "Diesel supply contract — Q3 2026",
    status: "AWARDED",
    createdOn: "2026-05-15",
    submissionDeadline: "2026-05-28",
    totalValue: 340000,
    currency: "SAR",
    vendorsSelected: 4,
    quotesReceived: 4,
  },
  {
    id: "rfq_001",
    reference: "NHT-24-0001",
    title: "Annual office supplies — administrative HQ",
    status: "AWARDED",
    createdOn: "2026-04-20",
    submissionDeadline: "2026-05-05",
    totalValue: 45700,
    currency: "SAR",
    vendorsSelected: 3,
    quotesReceived: 3,
  },
];

export const VENDOR_RFQS: RfqSummary[] = [
  {
    id: "rfq_v_001",
    reference: "NHT-24-0007",
    title: "Steel bearings & industrial lubricants — Q4 sourcing",
    status: "DISTRIBUTED",
    createdOn: "2026-09-12",
    submissionDeadline: "2026-09-26",
    totalValue: 34125,
    currency: "SAR",
    vendorsSelected: 4,
    quotesReceived: 2,
  },
  {
    id: "rfq_v_002",
    reference: "GLC-24-0032",
    title: "High-tensile stainless fasteners — M8 to M20",
    status: "DISTRIBUTED",
    createdOn: "2026-09-10",
    submissionDeadline: "2026-09-24",
    totalValue: 18500,
    currency: "SAR",
    vendorsSelected: 5,
    quotesReceived: 1,
  },
  {
    id: "rfq_v_003",
    reference: "AJD-24-0102",
    title: "Precision-ground shafts, hardened, 20 mm dia",
    status: "QUOTED",
    createdOn: "2026-09-05",
    submissionDeadline: "2026-09-19",
    totalValue: 12400,
    currency: "SAR",
    vendorsSelected: 3,
    quotesReceived: 3,
  },
];
