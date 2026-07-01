"use client";

import Link from "next/link";
import {
  ArrowRight,
  Send,
  Package,
  Truck,
  Wallet,
  FileText,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  VENDOR_KPIS,
  VENDOR_USER,
  VENDOR_RFQS,
  type RfqStatus,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusVariants: Record<RfqStatus, { bg: string; text: string; label: string }> = {
  DRAFT: { bg: "bg-muted", text: "text-muted-foreground", label: "Draft" },
  DISTRIBUTED: { bg: "bg-vendor-muted", text: "text-vendor", label: "New" },
  QUOTED: { bg: "bg-admin-muted", text: "text-admin", label: "Quoted" },
  AWARDED: { bg: "bg-success-muted", text: "text-success", label: "Won" },
  CANCELLED: { bg: "bg-muted", text: "text-muted-foreground", label: "Cancelled" },
};

function KpiCard({
  label,
  value,
  suffix,
  hint,
  icon: Icon,
  accent = "vendor",
}: {
  label: string;
  value: string;
  suffix?: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "vendor" | "success" | "warning";
}) {
  const bgMap = {
    vendor: "bg-vendor-muted text-vendor",
    success: "bg-success-muted text-success",
    warning: "bg-warning-muted text-warning",
  };
  return (
    <Card className="border-border/60 hover:border-border transition-colors">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </p>
          <div className={cn("h-8 w-8 rounded-md flex items-center justify-center", bgMap[accent])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[34px] font-medium tracking-[-0.03em] tabular text-foreground">
            {value}
          </span>
          {suffix && <span className="text-[13px] text-muted-foreground">{suffix}</span>}
        </div>
        <p className="text-[12px] text-muted-foreground mt-2">{hint}</p>
      </CardContent>
    </Card>
  );
}

export default function VendorDashboard() {
  const user = VENDOR_USER;
  const kpis = VENDOR_KPIS;

  const onboardingBuyers = [
    { name: "North Harbor Trading Co.", city: "Riyadh", step: 3, total: 3, status: "Approved" },
    { name: "Al-Faisaliah Group", city: "Riyadh", step: 2, total: 3, status: "In review" },
    { name: "Gulf Construction Ltd.", city: "Jeddah", step: 1, total: 3, status: "In progress" },
  ];

  return (
    <AppShell variant="vendor">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* PAGE HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Vendor workspace
            </p>
            <h1 className="text-[30px] font-medium tracking-[-0.025em] text-foreground">
              Welcome back, {user.name.split(" ")[0]}.
            </h1>
            <p className="text-[14px] text-muted-foreground mt-1.5">
              {kpis.newRfqs} new quote requests waiting for your response.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Package className="h-3.5 w-3.5" />
              Update catalogue
            </Button>
            <Button size="sm" className="h-9 gap-1.5 bg-vendor text-white hover:bg-vendor/90">
              <Send className="h-3.5 w-3.5" />
              Submit quote
            </Button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard
            label="New RFQs"
            value={kpis.newRfqs.toString()}
            suffix="to review"
            hint="2 close within 48h"
            icon={FileText}
            accent="vendor"
          />
          <KpiCard
            label="Quotes Submitted"
            value={kpis.quotesSubmitted.toString()}
            suffix="awaiting decision"
            hint="6 buyers reviewing"
            icon={Send}
            accent="vendor"
          />
          <KpiCard
            label="Active Orders"
            value={kpis.activeOrders.toString()}
            suffix="in progress"
            hint="3 awaiting shipment"
            icon={Truck}
            accent="warning"
          />
          <KpiCard
            label="Pending Payment"
            value={`SAR ${kpis.pendingPayment.toLocaleString()}`}
            hint="Across 9 invoices"
            icon={Wallet}
            accent="success"
          />
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New RFQs */}
          <Card className="lg:col-span-2 border-border/60">
            <div className="px-6 py-4 flex items-center justify-between border-b border-border/60">
              <div>
                <h2 className="text-[15px] font-medium">RFQs from buyers</h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  Open requests you can quote on
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-[12px] gap-1 text-muted-foreground">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <div>
              {VENDOR_RFQS.map((rfq) => {
                const s = statusVariants[rfq.status];
                const daysLeft = Math.ceil(
                  (new Date(rfq.submissionDeadline).getTime() - new Date("2026-07-01").getTime()) / (1000 * 60 * 60 * 24)
                );
                return (
                  <div
                    key={rfq.id}
                    className="group flex items-center gap-4 px-6 py-4 border-b border-border/40 last:border-0 hover:bg-muted/40 transition-colors"
                  >
                    <span className="h-8 w-1 rounded-full bg-vendor shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-mono text-[11px] text-muted-foreground tabular">
                          {rfq.reference}
                        </span>
                        <Badge
                          className={cn(
                            s.bg,
                            s.text,
                            "border-0 text-[10px] font-medium uppercase tracking-wider px-1.5 py-0"
                          )}
                        >
                          {s.label}
                        </Badge>
                      </div>
                      <p className="text-[14px] font-medium truncate">{rfq.title}</p>
                      <p className="text-[12px] text-muted-foreground mt-0.5">
                        Target SAR {rfq.totalValue.toLocaleString()} · {rfq.vendorsSelected} vendors invited
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={cn(
                        "text-[11px] font-medium tabular",
                        daysLeft <= 3 ? "text-warning" : "text-muted-foreground"
                      )}>
                        {daysLeft > 0 ? `${daysLeft}d left` : "Overdue"}
                      </span>
                      <Button size="sm" variant="outline" className="h-7 text-[11px] bg-vendor text-white hover:bg-vendor/90 border-vendor">
                        Quote →
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Onboarding progress per buyer */}
          <Card className="border-border/60 h-fit">
            <div className="px-6 py-4 border-b border-border/60">
              <h2 className="text-[15px] font-medium">Onboarding progress</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Per buyer relationship
              </p>
            </div>
            <div className="px-6 py-4 space-y-5">
              {onboardingBuyers.map((b, i) => (
                <div key={i}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[13px] font-medium">{b.name}</p>
                      <p className="text-[11px] text-muted-foreground">{b.city}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px]">
                      {b.status === "Approved" ? (
                        <CheckCircle2 className="h-3 w-3 text-success" />
                      ) : (
                        <Clock3 className="h-3 w-3 text-warning" />
                      )}
                      <span
                        className={cn(
                          "font-medium",
                          b.status === "Approved" ? "text-success" : "text-warning"
                        )}
                      >
                        {b.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: b.total }).map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "h-1 flex-1 rounded-full",
                          idx < b.step ? "bg-vendor" : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1.5 tabular">
                    Step {b.step} of {b.total}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
