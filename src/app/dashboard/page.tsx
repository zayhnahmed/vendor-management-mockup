"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
  FileText,
  Receipt,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BUYER_KPIS,
  BUYER_USER,
  RECENT_RFQS,
  RECENT_ACTIVITY,
  TOP_VENDORS,
  type RfqStatus,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusVariants: Record<RfqStatus, { bg: string; text: string; label: string }> = {
  DRAFT: { bg: "bg-muted", text: "text-muted-foreground", label: "Draft" },
  DISTRIBUTED: { bg: "bg-buyer-muted", text: "text-buyer", label: "Distributed" },
  QUOTED: { bg: "bg-warning-muted", text: "text-warning", label: "Quoted" },
  AWARDED: { bg: "bg-admin-muted", text: "text-admin", label: "Awarded" },
  CANCELLED: { bg: "bg-muted", text: "text-muted-foreground", label: "Cancelled" },
};

function KpiCard({
  label,
  value,
  suffix,
  hint,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  suffix?: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
}) {
  return (
    <Card className="relative overflow-hidden border-border/60 hover:border-border transition-colors">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </p>
          <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[34px] font-medium tracking-[-0.03em] tabular text-foreground">
            {value}
          </span>
          {suffix && (
            <span className="text-[13px] text-muted-foreground">{suffix}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2 text-[12px]">
          {trend && (
            <span className="text-success flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </span>
          )}
          <span className="text-muted-foreground">{hint}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BuyerDashboard() {
  const user = BUYER_USER;
  const kpis = BUYER_KPIS;
  const hour = new Date().getHours();
  const dayPart =
    hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* PAGE HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Buyer workspace
            </p>
            <h1 className="text-[30px] font-medium tracking-[-0.025em] text-foreground">
              Good {dayPart}, {user.name.split(" ")[0]}.
            </h1>
            <p className="text-[14px] text-muted-foreground mt-1.5">
              Here&apos;s what needs attention across your buying operations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              AI insights
            </Button>
            <Button size="sm" className="h-9 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New RFQ
            </Button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard
            label="Open RFQs"
            value={kpis.openRfqs.toString()}
            suffix="active"
            hint="2 awaiting review"
            icon={FileText}
            trend="+12%"
          />
          <KpiCard
            label="Pending Orders"
            value={kpis.pendingOrders.toString()}
            suffix="issued"
            hint="3 awaiting acknowledgement"
            icon={ArrowUpRight}
          />
          <KpiCard
            label="Invoices Due"
            value={`SAR ${kpis.invoicesDue.toLocaleString()}`}
            hint="Across 5 vendors"
            icon={Receipt}
          />
          <KpiCard
            label="Active Vendors"
            value={kpis.vendorsActive.toString()}
            suffix="connected"
            hint="4 onboarding in progress"
            icon={Users}
            trend="+2 this month"
          />
        </div>

        {/* BODY: RECENT RFQs (2 cols) + ACTIVITY (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent RFQs */}
          <Card className="lg:col-span-2 border-border/60">
            <div className="px-6 py-4 flex items-center justify-between border-b border-border/60">
              <div>
                <h2 className="text-[15px] font-medium">Recent quote requests</h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {RECENT_RFQS.length} active requests · 2 near deadline
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-[12px] gap-1 text-muted-foreground">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <div>
              {RECENT_RFQS.slice(0, 4).map((rfq) => {
                const s = statusVariants[rfq.status];
                return (
                  <Link
                    key={rfq.id}
                    href={`/rfqs/${rfq.id}`}
                    className="group flex items-center gap-4 px-6 py-4 border-b border-border/40 last:border-0 hover:bg-muted/40 transition-colors"
                  >
                    <span className="h-8 w-1 rounded-full bg-buyer shrink-0" />
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
                      <p className="text-[14px] font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {rfq.title}
                      </p>
                      <p className="text-[12px] text-muted-foreground mt-0.5">
                        {rfq.vendorsSelected} vendors · {rfq.quotesReceived} quotes received
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-medium tabular text-foreground">
                        {rfq.totalValue > 0
                          ? `SAR ${rfq.totalValue.toLocaleString()}`
                          : "—"}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Due {new Date(rfq.submissionDeadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>

          {/* Activity feed */}
          <Card className="border-border/60 h-fit">
            <div className="px-6 py-4 border-b border-border/60">
              <h2 className="text-[15px] font-medium">Recent activity</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Across your vendor network
              </p>
            </div>
            <div className="px-6 py-4 space-y-4">
              {RECENT_ACTIVITY.map((a) => (
                <div key={a.id} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-[10px] font-medium uppercase text-muted-foreground">
                    {a.actorName
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] leading-snug">
                      <span className="font-medium text-foreground">{a.actorName}</span>{" "}
                      <span className="text-muted-foreground">{a.action}</span>{" "}
                      {a.target && (
                        <span className="font-mono text-[11px] text-buyer">{a.target}</span>
                      )}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{a.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* TOP VENDORS */}
        <Card className="mt-6 border-border/60">
          <div className="px-6 py-4 flex items-center justify-between border-b border-border/60">
            <div>
              <h2 className="text-[15px] font-medium">Top vendors</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                By activity across your connected suppliers
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-[12px] gap-1 text-muted-foreground">
              Manage <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {TOP_VENDORS.map((v) => (
              <div
                key={v.id}
                className="p-5 border-r border-border/40 last:border-0 border-b md:border-b-0"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-md bg-vendor-muted text-vendor flex items-center justify-center font-medium text-[13px]">
                    {v.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium truncate">{v.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {v.city}, {v.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={cn(
                      "font-medium",
                      v.onboardingStatus === "ONBOARDED" && "text-success",
                      v.onboardingStatus === "AWAITING" && "text-warning",
                      v.onboardingStatus === "PENDING" && "text-muted-foreground"
                    )}
                  >
                    {v.onboardingStatus === "ONBOARDED"
                      ? "● Onboarded"
                      : v.onboardingStatus === "AWAITING"
                      ? "● Awaiting docs"
                      : "● Pending"}
                  </span>
                  <span className="text-muted-foreground tabular">
                    ★ {v.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
