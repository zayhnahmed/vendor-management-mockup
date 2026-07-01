"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, MessageSquare, Check, X, ArrowUpRight, Compass } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ACTIVE_CONNECTIONS, CONNECTION_REQUESTS, type ConnectionType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeColors: Record<ConnectionType, string> = {
  VENDOR: "bg-vendor-muted text-vendor",
  BUYER: "bg-buyer-muted text-buyer",
  PARTNER: "bg-admin-muted text-admin",
};

type Tab = "ACTIVE" | "INCOMING" | "OUTGOING";

export default function ConnectionsPage() {
  const [tab, setTab] = useState<Tab>("ACTIVE");

  const incoming = CONNECTION_REQUESTS.filter(r => r.direction === "INCOMING");
  const outgoing = CONNECTION_REQUESTS.filter(r => r.direction === "OUTGOING");

  const counts = {
    ACTIVE: ACTIVE_CONNECTIONS.length,
    INCOMING: incoming.length,
    OUTGOING: outgoing.length,
  };

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Network
            </p>
            <h1 className="text-[30px] font-bold tracking-[-0.025em]">Connections</h1>
            <p className="text-[14px] text-muted-foreground mt-1.5">
              Your active trading partners and pending requests.
            </p>
          </div>
          <Link href="/discover">
            <Button size="sm" className="h-9 gap-1.5">
              <Compass className="h-3.5 w-3.5" />
              Find new partners
            </Button>
          </Link>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-1 mb-6 border-b border-border/60">
          {([
            ["ACTIVE", "Active connections"],
            ["INCOMING", "Incoming"],
            ["OUTGOING", "Sent"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "px-4 py-2.5 text-[13px] font-semibold transition-colors border-b-2 flex items-center gap-2",
                tab === key ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
              <span className={cn(
                "text-[10px] font-bold tabular px-1.5 py-0 rounded",
                tab === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* SEARCH */}
        {tab === "ACTIVE" && (
          <div className="relative max-w-sm mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search connections..." className="pl-9 h-9 text-[13px]" />
          </div>
        )}

        {/* CONTENT */}
        {tab === "ACTIVE" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACTIVE_CONNECTIONS.map(c => {
              const initials = c.organizationName.split(" ").map(w => w[0]).slice(0, 2).join("");
              return (
                <Card key={c.id} className="border-border/60 hover:border-border transition-all p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={cn("h-11 w-11 rounded-lg flex items-center justify-center font-bold text-[14px] shrink-0", typeColors[c.type])}>
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold truncate">{c.organizationName}</p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground">
                        <MapPin className="h-2.5 w-2.5" />
                        <span>{c.city}, {c.country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={cn(typeColors[c.type], "border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0")}>
                      {c.type}
                    </Badge>
                    <Badge className="bg-muted text-muted-foreground border-0 text-[10px] font-semibold px-1.5 py-0">
                      {c.category}
                    </Badge>
                  </div>

                  <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active deals</p>
                      <p className="text-[18px] font-bold tabular">{c.activeDeals}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Connected</p>
                      <p className="text-[12px] font-semibold tabular">
                        {new Date(c.connectedSince).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {tab === "INCOMING" && (
          <div className="space-y-3">
            {incoming.map(r => {
              const initials = r.organizationName.split(" ").map(w => w[0]).slice(0, 2).join("");
              return (
                <Card key={r.id} className="border-border/60 p-5">
                  <div className="flex items-start gap-4">
                    <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center font-bold text-[14px] shrink-0", typeColors[r.type])}>
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[14px] font-bold truncate">{r.organizationName}</p>
                        <Badge className={cn(typeColors[r.type], "border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0")}>
                          {r.type}
                        </Badge>
                        <Badge className="bg-muted text-muted-foreground border-0 text-[10px] font-semibold px-1.5 py-0">
                          {r.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2">
                        <MapPin className="h-2.5 w-2.5" />
                        <span>{r.city}, {r.country}</span>
                        <span className="mx-1">·</span>
                        <span>received {new Date(r.sentOn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                      </div>
                      <div className="flex items-start gap-2 mt-3 p-3 bg-muted/30 rounded-md">
                        <MessageSquare className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-[12px] text-foreground italic">&ldquo;{r.message}&rdquo;</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button size="sm" variant="outline" className="h-8 gap-1 text-destructive hover:text-destructive">
                        <X className="h-3.5 w-3.5" />
                        Decline
                      </Button>
                      <Button size="sm" className="h-8 gap-1">
                        <Check className="h-3.5 w-3.5" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {tab === "OUTGOING" && (
          <div className="space-y-3">
            {outgoing.map(r => {
              const initials = r.organizationName.split(" ").map(w => w[0]).slice(0, 2).join("");
              return (
                <Card key={r.id} className="border-border/60 p-5">
                  <div className="flex items-center gap-4">
                    <div className={cn("h-11 w-11 rounded-lg flex items-center justify-center font-bold text-[14px] shrink-0", typeColors[r.type])}>
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold truncate">{r.organizationName}</p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground">
                        <MapPin className="h-2.5 w-2.5" />
                        <span>{r.city}, {r.country}</span>
                        <span className="mx-1">·</span>
                        <span>sent {new Date(r.sentOn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                      </div>
                    </div>
                    <Badge className="bg-warning-muted text-warning border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0">
                      Awaiting response
                    </Badge>
                    <Button size="sm" variant="ghost" className="h-8 text-[12px] text-muted-foreground">
                      Cancel
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
