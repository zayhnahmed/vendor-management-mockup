"use client";

import { useState } from "react";
import { Search, MapPin, Star, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DISCOVERY_ORGS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DiscoverPage() {
  const [tab, setTab] = useState<"VENDOR" | "BUYER">("VENDOR");
  const [search, setSearch] = useState("");

  const filtered = DISCOVERY_ORGS.filter(o => {
    if (o.type !== tab) return false;
    if (search && !o.name.toLowerCase().includes(search.toLowerCase()) && !o.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const tabAccent = tab === "VENDOR" ? "text-vendor bg-vendor-muted" : "text-buyer bg-buyer-muted";

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
            Network
          </p>
          <h1 className="text-[30px] font-bold tracking-[-0.025em]">Discover</h1>
          <p className="text-[14px] text-muted-foreground mt-1.5">
            Search {DISCOVERY_ORGS.length} organisations on the platform and grow your network.
          </p>
        </div>

        {/* HERO SEARCH */}
        <Card className="border-border/60 bg-gradient-to-br from-background to-muted/40 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-[13px] font-semibold text-foreground">
              Find the perfect trading partner
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${tab === "VENDOR" ? "vendors" : "buyers"} by name, category, or region...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 text-[14px] bg-background"
              />
            </div>
            <Button size="lg" className="h-12 px-6 font-semibold">
              Search
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mr-1">Quick filters:</span>
            {["Steel & Metals", "Construction", "Chemicals", "Logistics", "Fuel & Energy"].map(f => (
              <button key={f} type="button" className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-border hover:bg-muted transition-colors">
                {f}
              </button>
            ))}
          </div>
        </Card>

        {/* TABS */}
        <div className="flex items-center gap-1 mb-5 border-b border-border/60">
          {(["VENDOR", "BUYER"] as const).map(t => {
            const count = DISCOVERY_ORGS.filter(o => o.type === t).length;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "px-4 py-2.5 text-[13px] font-semibold transition-colors border-b-2 flex items-center gap-2",
                  tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "VENDOR" ? "Vendors" : "Buyers"}
                <span className="text-[11px] font-medium text-muted-foreground tabular">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(org => {
            const initials = org.name.split(" ").map(w => w[0]).slice(0, 2).join("");
            return (
              <Card key={org.id} className="border-border/60 hover:border-border transition-all hover:shadow-md p-5">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center font-bold text-[14px] shrink-0", tabAccent)}>
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[14px] font-bold truncate">{org.name}</p>
                      {org.verified && <ShieldCheck className="h-3.5 w-3.5 text-success shrink-0" aria-label="Verified" />}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground">
                      <MapPin className="h-2.5 w-2.5" />
                      <span>{org.city}, {org.country}</span>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <Badge className="mb-3 bg-muted text-foreground border border-border text-[10px] font-semibold px-2">
                  {org.category}
                </Badge>

                {/* Description */}
                <p className="text-[12px] text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {org.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-[12px] font-semibold tabular">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {org.rating.toFixed(1)}
                    <span className="text-muted-foreground font-normal">({org.reviews})</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    <span className="tabular">{org.yearsOnPlatform}</span> years on platform
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="flex-1 h-8 text-[12px] font-semibold">
                    View profile
                  </Button>
                  <Button size="sm" className="flex-1 h-8 text-[12px] font-semibold gap-1 group">
                    Connect
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-[13px]">No {tab === "VENDOR" ? "vendors" : "buyers"} match your search.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
