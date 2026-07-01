"use client";

import Link from "next/link";
import { MapPin, Clock3, ArrowRight, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ONBOARDING_SUBMISSIONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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

export default function OnboardingReviewsPage() {
  const pending = ONBOARDING_SUBMISSIONS.filter(s => s.status === "SUBMITTED");

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
            Approvals
          </p>
          <h1 className="text-[30px] font-bold tracking-[-0.025em]">Onboarding Reviews</h1>
          <p className="text-[14px] text-muted-foreground mt-1.5">
            Vendor qualification submissions awaiting your approval before you can trade.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Kpi label="Awaiting Review" value={pending.length.toString()} hint="Vendor submissions" icon={Clock3} accent="bg-warning-muted text-warning" />
          <Kpi label="Approved This Quarter" value="12" hint="Now eligible to trade" icon={ShieldCheck} accent="bg-success-muted text-success" />
          <Kpi label="Avg. Review Time" value="1.8d" hint="Across all submissions" icon={Clock3} accent="bg-buyer-muted text-buyer" />
        </div>

        {/* Submissions */}
        <div>
          <h2 className="text-[14px] font-bold mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-warning" />
            Awaiting your review · {pending.length}
          </h2>

          <div className="space-y-3">
            {pending.map(sub => {
              const daysSince = Math.floor((new Date("2026-07-02").getTime() - new Date(sub.submittedOn).getTime()) / (1000 * 60 * 60 * 24));
              return (
                <Card key={sub.id} className="border-border/60 hover:border-border transition-all p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-vendor-muted text-vendor flex items-center justify-center font-bold text-[13px] shrink-0">
                      {sub.vendorShort}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[15px] font-bold truncate">{sub.vendorName}</p>
                        <Badge className="bg-warning-muted text-warning border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0">
                          Submitted
                        </Badge>
                        <Badge className="bg-muted text-muted-foreground border-0 text-[10px] font-semibold px-1.5 py-0">
                          {sub.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-3">
                        <MapPin className="h-2.5 w-2.5" />
                        <span>{sub.vendorCity}, {sub.vendorCountry}</span>
                        <span className="mx-1">·</span>
                        <span>Est. {sub.yearOfEstablishment}</span>
                        <span className="mx-1">·</span>
                        <span>{sub.yearsInBusiness} years in business</span>
                      </div>

                      {/* Snapshot facts */}
                      <div className="grid grid-cols-3 gap-3 py-2 border-y border-border/50 mt-2">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Turnover</p>
                          <p className="text-[13px] font-semibold tabular">{sub.currency} {(sub.annualTurnover / 1000000).toFixed(1)}M</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Certifications</p>
                          <p className="text-[13px] font-semibold tabular">{sub.certifications.length} valid</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Submitted</p>
                          <p className="text-[13px] font-semibold tabular">{daysSince} days ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <Link href={`/onboarding-reviews/${sub.id}`}>
                        <button className="inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-primary text-primary-foreground text-[13px] font-semibold hover:bg-primary/90 transition-colors">
                          Review
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
