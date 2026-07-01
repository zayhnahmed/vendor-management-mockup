"use client";

import Link from "next/link";
import { ArrowLeft, Send, Download, MoreHorizontal, Trophy, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RFQ_DETAIL_FEATURED } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function RfqDetailPage() {
  const rfq = RFQ_DETAIL_FEATURED;

  const submittedQuotes = rfq.quotes.filter((q) => q.status === "SUBMITTED");
  const lowestQuote = submittedQuotes.reduce((min, q) =>
    q.totalPrice < min.totalPrice ? q : min,
    submittedQuotes[0]
  );

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* BACK LINK */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to dashboard
        </Link>

        {/* HEADER */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[11px] tabular text-muted-foreground uppercase tracking-widest">
                RFQ · {rfq.reference}
              </span>
              <Badge className="bg-buyer-muted text-buyer border-0 text-[10px] font-medium uppercase tracking-wider px-1.5">
                Distributed
              </Badge>
            </div>
            <h1 className="text-[30px] font-medium tracking-[-0.025em] text-foreground max-w-[820px]">
              {rfq.title}
            </h1>
            <p className="text-[14px] text-muted-foreground mt-2 max-w-[820px]">
              {rfq.termsSummary}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Party split card — the "Between" moment */}
        <Card className="border-border/60 mb-6 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* BUYER */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-border/60 relative">
              <div className="absolute top-0 left-0 h-full w-1 bg-buyer" />
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Buyer · requested by
              </p>
              <p className="text-[18px] font-medium tracking-[-0.015em]">
                {rfq.buyer.organizationName}
              </p>
              <p className="text-[13px] text-foreground/80 mt-2">
                {rfq.buyer.contactName}
                <span className="text-muted-foreground"> · {rfq.buyer.contactRole}</span>
              </p>
              <p className="text-[12px] text-muted-foreground mt-1">
                {rfq.buyer.city}, {rfq.buyer.country}
              </p>
            </div>

            {/* VENDOR */}
            <div className="p-6 relative">
              <div className="absolute top-0 left-0 h-full w-1 bg-vendor lg:hidden" />
              <div className="absolute top-0 right-0 h-full w-1 bg-vendor hidden lg:block" />
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Vendor · addressed to
              </p>
              <p className="text-[18px] font-medium tracking-[-0.015em]">
                {rfq.vendor.organizationName}
              </p>
              <p className="text-[13px] text-foreground/80 mt-2">
                {rfq.vendor.contactName}
                <span className="text-muted-foreground"> · {rfq.vendor.contactRole}</span>
              </p>
              <p className="text-[12px] text-muted-foreground mt-1">
                {rfq.vendor.city}, {rfq.vendor.country}
              </p>
            </div>
          </div>
        </Card>

        {/* META STRIP */}
        <Card className="border-border/60 mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/60">
            {[
              { label: "Created", value: new Date(rfq.createdOn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) },
              { label: "Deadline", value: new Date(rfq.submissionDeadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) },
              { label: "Delivery to", value: rfq.deliveryLocation },
              { label: "Currency", value: rfq.currency },
            ].map((m, i) => (
              <div key={i} className="p-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                  {m.label}
                </p>
                <p className={cn(
                  "text-[13px] text-foreground",
                  (m.label === "Created" || m.label === "Deadline" || m.label === "Currency") && "font-mono tabular"
                )}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LINE ITEMS */}
          <Card className="lg:col-span-2 border-border/60">
            <div className="px-6 py-4 flex items-center justify-between border-b border-border/60">
              <div>
                <h2 className="text-[15px] font-medium">Items requested</h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {rfq.items.length} lines · target total SAR {rfq.totalValue.toLocaleString()}
                </p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead className="w-10 text-[10px] uppercase tracking-wider font-medium text-muted-foreground">#</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">Material</TableHead>
                  <TableHead className="text-right w-24 text-[10px] uppercase tracking-wider font-medium text-muted-foreground">Qty</TableHead>
                  <TableHead className="text-right w-16 text-[10px] uppercase tracking-wider font-medium text-muted-foreground">Unit</TableHead>
                  <TableHead className="text-right w-28 text-[10px] uppercase tracking-wider font-medium text-muted-foreground">Target</TableHead>
                  <TableHead className="text-right w-28 text-[10px] uppercase tracking-wider font-medium text-muted-foreground">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rfq.items.map((item) => (
                  <TableRow key={item.no} className="border-border/40 hover:bg-muted/30">
                    <TableCell className="font-mono text-[12px] tabular text-muted-foreground">{item.no}</TableCell>
                    <TableCell className="py-4">
                      <p className="font-mono text-[11px] text-muted-foreground tabular mb-0.5">
                        {item.materialNumber}
                      </p>
                      <p className="text-[13px] font-medium leading-tight">{item.description}</p>
                    </TableCell>
                    <TableCell className="text-right font-mono text-[13px] tabular">
                      {item.quantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono text-[12px] tabular text-muted-foreground">
                      {item.unit}
                    </TableCell>
                    <TableCell className="text-right font-mono text-[13px] tabular">
                      {item.targetUnitPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-[13px] tabular font-medium">
                      {item.lineTotal.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Total */}
            <div className="p-6 bg-muted/30 border-t border-border/60 flex items-baseline justify-end gap-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Requested total
              </span>
              <span className="text-[13px] text-muted-foreground font-medium tabular">{rfq.currency}</span>
              <span className="text-[32px] font-medium tracking-[-0.03em] tabular">
                {rfq.totalValue.toLocaleString()}
              </span>
            </div>
          </Card>

          {/* QUOTES */}
          <Card className="border-border/60 h-fit">
            <div className="px-6 py-4 border-b border-border/60">
              <h2 className="text-[15px] font-medium">Quotes received</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                {submittedQuotes.length} of {rfq.quotes.length} vendors have quoted
              </p>
            </div>
            <div>
              {rfq.quotes.map((q, i) => {
                const isLowest = q.status === "SUBMITTED" && q.totalPrice === lowestQuote?.totalPrice;
                return (
                  <div
                    key={i}
                    className={cn(
                      "px-6 py-4 border-b border-border/40 last:border-0",
                      isLowest && "bg-success-muted/40"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[13px] font-medium truncate">{q.vendorName}</p>
                      {isLowest && <Trophy className="h-3.5 w-3.5 text-success shrink-0" />}
                    </div>
                    {q.status === "SUBMITTED" ? (
                      <div className="flex items-baseline justify-between">
                        <div>
                          <p className="text-[16px] font-medium tabular">
                            SAR {q.totalPrice.toLocaleString()}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {q.leadTimeDays} days lead time
                          </p>
                        </div>
                        {isLowest && (
                          <Button size="sm" className="h-7 text-[11px] bg-success text-white hover:bg-success/90">
                            Award
                          </Button>
                        )}
                      </div>
                    ) : (
                      <p className="text-[12px] text-muted-foreground italic">Awaiting response</p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex items-center justify-between p-5 border border-border/60 rounded-lg bg-muted/20">
          <p className="text-[13px] text-muted-foreground italic">
            &ldquo;Two parties, one document. Both sides sign, both sides deliver.&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive gap-1.5">
              <Trash2 className="h-3.5 w-3.5" />
              Cancel RFQ
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm">
              Save changes
            </Button>
            <Button size="sm" className="gap-1.5">
              <Send className="h-3.5 w-3.5" />
              Distribute to more vendors
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
