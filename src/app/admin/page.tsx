"use client";

import {
  Building2,
  ShieldCheck,
  ShoppingBag,
  Store,
  Check,
  X,
  ArrowRight,
  Activity,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ADMIN_KPIS, PENDING_ORGS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "admin",
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "admin" | "buyer" | "vendor" | "success";
}) {
  const bgMap = {
    admin: "bg-admin-muted text-admin",
    buyer: "bg-buyer-muted text-buyer",
    vendor: "bg-vendor-muted text-vendor",
    success: "bg-success-muted text-success",
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
        </div>
        <p className="text-[12px] text-muted-foreground mt-2">{hint}</p>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const kpis = ADMIN_KPIS;

  const growthData = [
    { month: "Feb", orgs: 92 },
    { month: "Mar", orgs: 104 },
    { month: "Apr", orgs: 118 },
    { month: "May", orgs: 128 },
    { month: "Jun", orgs: 135 },
    { month: "Jul", orgs: 142 },
  ];
  const maxGrowth = Math.max(...growthData.map((d) => d.orgs));

  return (
    <AppShell variant="admin">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* PAGE HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Platform administration
            </p>
            <h1 className="text-[30px] font-medium tracking-[-0.025em] text-foreground">
              Platform pulse
            </h1>
            <p className="text-[14px] text-muted-foreground mt-1.5">
              {kpis.pendingApprovals} organisations awaiting approval · {kpis.totalOrgs} onboarded overall.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              System logs
            </Button>
            <Button size="sm" className="h-9 gap-1.5 bg-admin text-white hover:bg-admin/90">
              <ShieldCheck className="h-3.5 w-3.5" />
              Review queue
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard
            label="Total Organisations"
            value={kpis.totalOrgs.toString()}
            hint="+7 this month"
            icon={Building2}
            accent="admin"
          />
          <KpiCard
            label="Pending Approvals"
            value={kpis.pendingApprovals.toString()}
            hint="4 orgs · 2 enrolments"
            icon={ShieldCheck}
            accent="vendor"
          />
          <KpiCard
            label="Active Buyers"
            value={kpis.activeBuyers.toString()}
            hint={`${((kpis.activeBuyers / kpis.totalOrgs) * 100).toFixed(0)}% of platform`}
            icon={ShoppingBag}
            accent="buyer"
          />
          <KpiCard
            label="Active Vendors"
            value={kpis.activeVendors.toString()}
            hint={`${((kpis.activeVendors / kpis.totalOrgs) * 100).toFixed(0)}% of platform`}
            icon={Store}
            accent="success"
          />
        </div>

        {/* Body: pending queue + growth */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Pending organisations queue */}
          <Card className="lg:col-span-2 border-border/60">
            <div className="px-6 py-4 flex items-center justify-between border-b border-border/60">
              <div>
                <h2 className="text-[15px] font-medium">Pending organisations</h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  Registrations awaiting your review
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-[12px] gap-1 text-muted-foreground">
                Full queue <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <div>
              {PENDING_ORGS.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center gap-4 px-6 py-4 border-b border-border/40 last:border-0 hover:bg-muted/40 transition-colors"
                >
                  <div className="h-10 w-10 rounded-md bg-admin-muted text-admin flex items-center justify-center font-medium text-[13px]">
                    {org.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium truncate">{org.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[12px] text-muted-foreground">
                      <span>{org.contactName}</span>
                      <span className="text-border">·</span>
                      <span>{org.country}</span>
                      <span className="text-border">·</span>
                      <span className="tabular">
                        {new Date(org.submittedOn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {org.requestedRoles.map((r) => (
                      <Badge
                        key={r}
                        className={cn(
                          "text-[10px] font-medium uppercase tracking-wider border-0 px-1.5",
                          r === "BUYER" ? "bg-buyer-muted text-buyer" : "bg-vendor-muted text-vendor"
                        )}
                      >
                        {r}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-8 w-8 bg-admin text-white hover:bg-admin/90"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Growth chart (custom mini-bar) */}
          <Card className="border-border/60">
            <div className="px-6 py-4 border-b border-border/60">
              <h2 className="text-[15px] font-medium">Growth</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Organisations over 6 months
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-[32px] font-medium tracking-[-0.02em] tabular text-foreground">
                  {kpis.totalOrgs}
                </span>
                <span className="text-[13px] text-success font-medium">+54%</span>
              </div>
              <div className="flex items-end gap-2 h-32">
                {growthData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "w-full rounded-t",
                        d.orgs === maxGrowth ? "bg-admin" : "bg-admin/25"
                      )}
                      style={{ height: `${(d.orgs / maxGrowth) * 100}%` }}
                    />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      {d.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Platform composition */}
        <Card className="border-border/60">
          <div className="px-6 py-4 border-b border-border/60">
            <h2 className="text-[15px] font-medium">Platform composition</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Buyer / vendor / dual-role split
            </p>
          </div>
          <div className="p-6">
            {(() => {
              const buyerOnly = 42;
              const vendorOnly = 28;
              const dual = 36;
              const pending = 36;
              const total = buyerOnly + vendorOnly + dual + pending;
              const segments = [
                { label: "Buyer only", count: buyerOnly, className: "bg-buyer" },
                { label: "Dual-role", count: dual, className: "bg-admin" },
                { label: "Vendor only", count: vendorOnly, className: "bg-vendor" },
                { label: "Pending", count: pending, className: "bg-muted" },
              ];
              return (
                <>
                  <div className="flex h-3 w-full rounded overflow-hidden">
                    {segments.map((s) => (
                      <div
                        key={s.label}
                        className={s.className}
                        style={{ width: `${(s.count / total) * 100}%` }}
                        title={`${s.label}: ${s.count}`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-6 mt-4">
                    {segments.map((s) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <span className={cn("h-2.5 w-2.5 rounded-sm", s.className)} />
                        <span className="text-[12px] text-muted-foreground">
                          {s.label}
                        </span>
                        <span className="text-[13px] font-medium tabular">
                          {s.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
