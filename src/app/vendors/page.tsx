"use client";

import Link from "next/link";
import { Search, Plus, Star, MapPin, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOP_VENDORS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  ONBOARDED: { bg: "bg-success-muted", text: "text-success", label: "Onboarded" },
  AWAITING: { bg: "bg-warning-muted", text: "text-warning", label: "Awaiting docs" },
  PENDING: { bg: "bg-muted", text: "text-muted-foreground", label: "Pending" },
};

// Extended vendor list with more realistic data
const ALL_VENDORS = [
  ...TOP_VENDORS,
  { id: "ven_es2", name: "Al-Rashid Industrial Supply", city: "Dammam", country: "Saudi Arabia", onboardingStatus: "ONBOARDED" as const, activeRfqs: 1, rating: 4.5 },
  { id: "ven_es3", name: "Gulf Bearing Partners", city: "Kuwait City", country: "Kuwait", onboardingStatus: "AWAITING" as const, activeRfqs: 0, rating: 4.2 },
  { id: "ven_es4", name: "SafetyFirst Industrial", city: "Dammam", country: "Saudi Arabia", onboardingStatus: "ONBOARDED" as const, activeRfqs: 2, rating: 4.9 },
  { id: "ven_es5", name: "Al-Waha Fuels", city: "Riyadh", country: "Saudi Arabia", onboardingStatus: "ONBOARDED" as const, activeRfqs: 1, rating: 4.6 },
];

export default function VendorsPage() {
  return (
    <AppShell variant="buyer">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Network
            </p>
            <h1 className="text-[30px] font-bold tracking-[-0.025em]">Your Vendors</h1>
            <p className="text-[14px] text-muted-foreground mt-1.5">
              {ALL_VENDORS.length} connected vendors · {ALL_VENDORS.filter(v => v.onboardingStatus === "ONBOARDED").length} fully onboarded.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/discover">
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <Search className="h-3.5 w-3.5" />
                Discover more
              </Button>
            </Link>
            <Button size="sm" className="h-9 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Invite vendor
            </Button>
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search vendors..." className="pl-9 h-9 text-[13px]" />
          </div>
          <Button variant="outline" size="sm" className="h-9 text-[12px]">All statuses</Button>
          <Button variant="outline" size="sm" className="h-9 text-[12px]">All categories</Button>
          <Button variant="outline" size="sm" className="h-9 text-[12px]">All countries</Button>
        </div>

        {/* Grid of vendor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_VENDORS.map(v => {
            const s = statusStyles[v.onboardingStatus];
            const initials = v.name.split(" ").map(w => w[0]).slice(0, 2).join("");
            return (
              <Card key={v.id} className="border-border/60 hover:border-border transition-all hover:shadow-sm p-5 flex flex-col gap-4">
                {/* Header row */}
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-lg bg-vendor-muted text-vendor flex items-center justify-center font-bold text-[14px] shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold truncate">{v.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground">
                      <MapPin className="h-2.5 w-2.5" />
                      <span>{v.city}, {v.country}</span>
                    </div>
                  </div>
                </div>

                {/* Status + rating */}
                <div className="flex items-center justify-between">
                  <Badge className={cn(s.bg, s.text, "border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0")}>
                    {s.label}
                  </Badge>
                  <div className="flex items-center gap-1 text-[12px] font-semibold tabular">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {v.rating.toFixed(1)}
                  </div>
                </div>

                {/* Stats row */}
                <div className="pt-4 border-t border-border/40 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Active RFQs</p>
                    <p className="text-[16px] font-bold tabular">{v.activeRfqs}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Reliability</p>
                    <p className="text-[16px] font-bold tabular flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      98%
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="flex-1 h-8 text-[12px] font-semibold">
                    View profile
                  </Button>
                  <Button size="sm" className="flex-1 h-8 text-[12px] font-semibold">
                    New RFQ
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
