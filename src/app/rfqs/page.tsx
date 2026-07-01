"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Plus,
  Download,
  FileText,
  Send,
  Trophy,
  Clock3,
  Search,
} from "lucide-react";
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
import { RFQS_BUYER_LIST, type RfqStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<RfqStatus, { bg: string; text: string; label: string }> = {
  DRAFT: { bg: "bg-muted", text: "text-muted-foreground", label: "Draft" },
  DISTRIBUTED: { bg: "bg-buyer-muted", text: "text-buyer", label: "Distributed" },
  QUOTED: { bg: "bg-warning-muted", text: "text-warning", label: "Quoted" },
  AWARDED: { bg: "bg-admin-muted", text: "text-admin", label: "Awarded" },
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

export default function RfqListPage() {
  const [filter, setFilter] = useState<"ALL" | RfqStatus>("ALL");
  const [search, setSearch] = useState("");

  const filtered = RFQS_BUYER_LIST.filter(rfq => {
    if (filter !== "ALL" && rfq.status !== filter) return false;
    if (search && !rfq.title.toLowerCase().includes(search.toLowerCase()) && !rfq.reference.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalOpen = RFQS_BUYER_LIST.filter(r => r.status === "DISTRIBUTED" || r.status === "QUOTED").length;
  const totalAwarded = RFQS_BUYER_LIST.filter(r => r.status === "AWARDED").length;
  const totalDrafts = RFQS_BUYER_LIST.filter(r => r.status === "DRAFT").length;
  const totalQuotes = RFQS_BUYER_LIST.reduce((sum, r) => sum + r.quotesReceived, 0);

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Commerce
            </p>
            <h1 className="text-[30px] font-bold tracking-[-0.025em]">Quote Requests</h1>
            <p className="text-[14px] text-muted-foreground mt-1.5">
              Every RFQ you&apos;ve issued to your vendors.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-9 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New RFQ
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Kpi label="Open" value={totalOpen.toString()} hint="Distributed & quoted" icon={FileText} accent="bg-buyer-muted text-buyer" />
          <Kpi label="Quotes Received" value={totalQuotes.toString()} hint="Across all RFQs" icon={Send} accent="bg-warning-muted text-warning" />
          <Kpi label="Awarded" value={totalAwarded.toString()} hint="This quarter" icon={Trophy} accent="bg-admin-muted text-admin" />
          <Kpi label="Drafts" value={totalDrafts.toString()} hint="Awaiting distribution" icon={Clock3} accent="bg-muted text-muted-foreground" />
        </div>

        {/* FILTER TABS */}
        <div className="flex items-center gap-1 mb-5 border-b border-border/60">
          {(["ALL", "DRAFT", "DISTRIBUTED", "QUOTED", "AWARDED", "CANCELLED"] as const).map(t => {
            const count = t === "ALL" ? RFQS_BUYER_LIST.length : RFQS_BUYER_LIST.filter(r => r.status === t).length;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={cn(
                  "px-4 py-2.5 text-[13px] font-semibold transition-colors border-b-2 flex items-center gap-2",
                  filter === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "ALL" ? "All" : t.charAt(0) + t.slice(1).toLowerCase()}
                <span className="text-[11px] font-medium tabular">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TABLE */}
        <Card className="border-border/60">
          <div className="p-4 border-b border-border/60 flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search RFQ reference or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-[13px]"
              />
            </div>
            <p className="text-[12px] text-muted-foreground tabular">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {RFQS_BUYER_LIST.length}
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Reference</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Title</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground text-center w-24">Vendors</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground text-center w-24">Quotes</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground text-right">Value</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Status</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Deadline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(rfq => {
                const s = statusStyles[rfq.status];
                return (
                  <TableRow key={rfq.id} className="border-border/40 hover:bg-muted/30 cursor-pointer group">
                    <TableCell className="py-4">
                      <Link href={`/rfqs/${rfq.id}`} className="font-mono text-[12px] font-semibold tabular group-hover:text-primary transition-colors">
                        {rfq.reference}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/rfqs/${rfq.id}`} className="text-[13px] font-semibold group-hover:text-primary transition-colors line-clamp-1 max-w-md">
                        {rfq.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center font-mono text-[13px] tabular">{rfq.vendorsSelected}</TableCell>
                    <TableCell className="text-center">
                      <span className={cn("font-mono text-[13px] tabular", rfq.quotesReceived === rfq.vendorsSelected && "text-success font-semibold")}>
                        {rfq.quotesReceived} / {rfq.vendorsSelected}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-[13px] font-semibold tabular">
                      {rfq.totalValue > 0 ? `${rfq.currency} ${rfq.totalValue.toLocaleString()}` : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(s.bg, s.text, "border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0")}>
                        {s.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-[12px] tabular">
                        {new Date(rfq.submissionDeadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>
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
