"use client";

import { useState } from "react";
import { Plus, Download, Package, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
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
import { MATERIALS, type MaterialType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeStyles: Record<MaterialType, string> = {
  BUY: "bg-buyer-muted text-buyer",
  SELL: "bg-vendor-muted text-vendor",
  BOTH: "bg-admin-muted text-admin",
};

const categoryColors: Record<string, string> = {
  Bearings: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Lubricants: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Construction: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Electrical: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Safety: "bg-red-500/10 text-red-600 dark:text-red-400",
  Fuel: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

export default function MaterialsPage() {
  const [filter, setFilter] = useState<"ALL" | MaterialType>("ALL");
  const [search, setSearch] = useState("");

  const filtered = MATERIALS.filter(m => {
    if (filter !== "ALL" && m.type !== filter) return false;
    if (search && !m.description.toLowerCase().includes(search.toLowerCase()) && !m.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Commerce
            </p>
            <h1 className="text-[30px] font-bold tracking-[-0.025em]">Materials Catalogue</h1>
            <p className="text-[14px] text-muted-foreground mt-1.5">
              Your organisation&apos;s master list of buy and sell items.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Import CSV
            </Button>
            <Button size="sm" className="h-9 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Add material
            </Button>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="flex items-center gap-1 mb-6 border-b border-border/60">
          {(["ALL", "BUY", "SELL", "BOTH"] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={cn(
                "px-4 py-2.5 text-[13px] font-semibold transition-colors border-b-2",
                filter === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "ALL" ? "All materials" : t.charAt(0) + t.slice(1).toLowerCase()}
              <span className="ml-2 text-[11px] font-medium text-muted-foreground tabular">
                {t === "ALL" ? MATERIALS.length : MATERIALS.filter(m => m.type === t).length}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <Card className="border-border/60">
          <div className="p-4 border-b border-border/60 flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search by code or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-[13px]"
              />
            </div>
            <p className="text-[12px] text-muted-foreground tabular">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {MATERIALS.length}
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Code</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Description</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Category</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground w-20">Type</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground text-center w-16">Unit</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground text-right">Last Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(m => (
                <TableRow key={m.id} className="border-border/40 hover:bg-muted/30 cursor-pointer">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                        <Package className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="font-mono text-[12px] font-semibold tabular">{m.code}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-[13px] font-medium max-w-md">{m.description}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Last ordered {new Date(m.lastOrdered).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(categoryColors[m.category] ?? "bg-muted text-muted-foreground", "border-0 text-[10px] font-semibold px-2")}>
                      {m.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(typeStyles[m.type], "border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0")}>
                      {m.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-mono text-[12px] tabular text-muted-foreground">{m.unit}</TableCell>
                  <TableCell className="text-right font-mono text-[13px] font-semibold tabular">{m.currency} {m.lastPrice.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppShell>
  );
}
