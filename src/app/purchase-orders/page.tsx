"use client";

import { Plus, Download, ShoppingCart, Truck, PackageCheck, AlertCircle, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PURCHASE_ORDERS, type PoStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<PoStatus, { bg: string; text: string; label: string }> = {
  DRAFT: { bg: "bg-muted", text: "text-muted-foreground", label: "Draft" },
  ISSUED: { bg: "bg-buyer-muted", text: "text-buyer", label: "Issued" },
  ACKNOWLEDGED: { bg: "bg-admin-muted", text: "text-admin", label: "Acknowledged" },
  SHIPPED: { bg: "bg-warning-muted", text: "text-warning", label: "Shipped" },
  DELIVERED: { bg: "bg-success-muted", text: "text-success", label: "Delivered" },
  CANCELLED: { bg: "bg-muted", text: "text-muted-foreground", label: "Cancelled" },
};

function Kpi({ label, value, hint, icon: Icon, accent }: { label: string; value: string; hint: string; icon: React.ComponentType<{ className?: string }>; accent: string }) {
  return (
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
          <div className={cn("h-8 w-8 rounded-md flex items-center justify-center", accent)}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <p className="text-[32px] font-bold tracking-[-0.03em] tabular text-foreground">{value}</p>
        <p className="text-[12px] text-muted-foreground mt-1.5">{hint}</p>
      </CardContent>
    </Card>
  );
}

export default function PurchaseOrdersPage() {
  const total = PURCHASE_ORDERS.length;
  const inTransit = PURCHASE_ORDERS.filter(p => p.status === "SHIPPED" || p.status === "ISSUED" || p.status === "ACKNOWLEDGED").length;
  const delivered = PURCHASE_ORDERS.filter(p => p.status === "DELIVERED").length;

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Commerce
            </p>
            <h1 className="text-[30px] font-bold tracking-[-0.025em]">Purchase Orders</h1>
            <p className="text-[14px] text-muted-foreground mt-1.5">
              Track every order from issue to delivery.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-9 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New PO
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Kpi label="Total Orders" value={total.toString()} hint="Across all vendors" icon={ShoppingCart} accent="bg-buyer-muted text-buyer" />
          <Kpi label="In Transit" value={inTransit.toString()} hint="Awaiting delivery" icon={Truck} accent="bg-warning-muted text-warning" />
          <Kpi label="Delivered" value={delivered.toString()} hint="This month" icon={PackageCheck} accent="bg-success-muted text-success" />
          <Kpi label="Overdue" value="1" hint="Past expected delivery" icon={AlertCircle} accent="bg-destructive/10 text-destructive" />
        </div>

        {/* TABLE */}
        <Card className="border-border/60">
          <div className="p-4 border-b border-border/60 flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search PO number or vendor..." className="pl-9 h-9 text-[13px]" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 text-[12px]">All statuses</Button>
              <Button variant="outline" size="sm" className="h-9 text-[12px]">All vendors</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">PO Number</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Vendor</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground text-center w-20">Items</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground text-right">Total</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Status</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Delivery</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PURCHASE_ORDERS.map(po => {
                const s = statusStyles[po.status];
                return (
                  <TableRow key={po.id} className="border-border/40 hover:bg-muted/30 cursor-pointer">
                    <TableCell className="py-4">
                      <span className="font-mono text-[12px] font-semibold tabular">{po.reference}</span>
                    </TableCell>
                    <TableCell>
                      <p className="text-[13px] font-semibold">{po.vendor}</p>
                      <p className="text-[11px] text-muted-foreground">{po.city}</p>
                    </TableCell>
                    <TableCell className="text-center font-mono text-[13px] tabular">{po.items}</TableCell>
                    <TableCell className="text-right">
                      <p className="text-[13px] font-semibold tabular">{po.currency} {po.total.toLocaleString()}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(s.bg, s.text, "border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0")}>
                        {s.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-[12px] tabular">{new Date(po.expectedDelivery).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppShell>
  );
}
