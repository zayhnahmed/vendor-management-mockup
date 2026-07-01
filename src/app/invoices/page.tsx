"use client";

import { Plus, Download, Receipt, Wallet, AlertTriangle, CheckCircle2, Search } from "lucide-react";
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
import { INVOICES, type InvoiceStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<InvoiceStatus, { bg: string; text: string; label: string }> = {
  PENDING: { bg: "bg-warning-muted", text: "text-warning", label: "Pending" },
  PAID: { bg: "bg-success-muted", text: "text-success", label: "Paid" },
  OVERDUE: { bg: "bg-destructive/10", text: "text-destructive", label: "Overdue" },
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

export default function InvoicesPage() {
  const totalDue = INVOICES.filter(i => i.status === "PENDING").reduce((sum, i) => sum + i.amount, 0);
  const overdue = INVOICES.filter(i => i.status === "OVERDUE").reduce((sum, i) => sum + i.amount, 0);
  const paidThisMonth = INVOICES.filter(i => i.status === "PAID").reduce((sum, i) => sum + i.amount, 0);

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Commerce
            </p>
            <h1 className="text-[30px] font-bold tracking-[-0.025em]">Invoices</h1>
            <p className="text-[14px] text-muted-foreground mt-1.5">
              Vendor invoices awaiting your payment.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-9 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Record payment
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Kpi label="Total Due" value={`SAR ${(totalDue / 1000).toFixed(1)}k`} hint={`${INVOICES.filter(i => i.status === "PENDING").length} pending invoices`} icon={Receipt} accent="bg-buyer-muted text-buyer" />
          <Kpi label="Overdue" value={`SAR ${(overdue / 1000).toFixed(1)}k`} hint={`${INVOICES.filter(i => i.status === "OVERDUE").length} past due date`} icon={AlertTriangle} accent="bg-destructive/10 text-destructive" />
          <Kpi label="Paid" value={`SAR ${(paidThisMonth / 1000).toFixed(0)}k`} hint="This month" icon={CheckCircle2} accent="bg-success-muted text-success" />
          <Kpi label="Pending Approval" value="3" hint="Waiting on you" icon={Wallet} accent="bg-warning-muted text-warning" />
        </div>

        {/* TABLE */}
        <Card className="border-border/60">
          <div className="p-4 border-b border-border/60 flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search invoice or vendor..." className="pl-9 h-9 text-[13px]" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 text-[12px]">All statuses</Button>
              <Button variant="outline" size="sm" className="h-9 text-[12px]">This quarter</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Invoice</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Vendor</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Against PO</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground text-right">Amount</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Due</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Status</TableHead>
                <TableHead className="text-right w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map(inv => {
                const s = statusStyles[inv.status];
                return (
                  <TableRow key={inv.id} className="border-border/40 hover:bg-muted/30">
                    <TableCell className="py-4">
                      <span className="font-mono text-[12px] font-semibold tabular">{inv.reference}</span>
                    </TableCell>
                    <TableCell>
                      <p className="text-[13px] font-semibold">{inv.vendor}</p>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-[11px] tabular text-muted-foreground">{inv.poReference}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="text-[13px] font-semibold tabular">{inv.currency} {inv.amount.toLocaleString()}</p>
                    </TableCell>
                    <TableCell>
                      <p className={cn("text-[12px] tabular", inv.status === "OVERDUE" && "text-destructive font-semibold")}>
                        {new Date(inv.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(s.bg, s.text, "border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0")}>
                        {s.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {inv.status !== "PAID" && inv.status !== "CANCELLED" && (
                        <Button size="sm" variant="outline" className="h-7 text-[11px] font-semibold">
                          Pay
                        </Button>
                      )}
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
