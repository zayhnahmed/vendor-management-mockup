"use client";

import {
  ShieldCheck,
  Receipt,
  ShoppingCart,
  FileText,
  Check,
  X,
  Clock,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MY_TASKS, type TaskType, type TaskUrgency } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const taskIcons: Record<TaskType, { icon: React.ComponentType<{ className?: string }>; accent: string; label: string }> = {
  VENDOR_ONBOARDING: { icon: ShieldCheck, accent: "bg-admin-muted text-admin", label: "Onboarding" },
  INVOICE_APPROVAL: { icon: Receipt, accent: "bg-buyer-muted text-buyer", label: "Invoice" },
  PO_APPROVAL: { icon: ShoppingCart, accent: "bg-warning-muted text-warning", label: "Purchase Order" },
  RFQ_REVIEW: { icon: FileText, accent: "bg-success-muted text-success", label: "RFQ Review" },
};

const urgencyStyles: Record<TaskUrgency, { text: string; bg: string; label: string }> = {
  HIGH: { text: "text-destructive", bg: "bg-destructive/10", label: "High" },
  MEDIUM: { text: "text-warning", bg: "bg-warning-muted", label: "Medium" },
  LOW: { text: "text-muted-foreground", bg: "bg-muted", label: "Low" },
};

export default function MyTasksPage() {
  const high = MY_TASKS.filter(t => t.urgency === "HIGH");
  const medium = MY_TASKS.filter(t => t.urgency === "MEDIUM");
  const low = MY_TASKS.filter(t => t.urgency === "LOW");

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
              Approvals
            </p>
            <h1 className="text-[30px] font-bold tracking-[-0.025em]">My Tasks</h1>
            <p className="text-[14px] text-muted-foreground mt-1.5">
              {MY_TASKS.length} items waiting for your review · <span className="text-destructive font-semibold">{high.length} high priority</span>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 text-[12px]">
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-9 text-[12px]">
              Mark all as read
            </Button>
          </div>
        </div>

        {/* GROUPS */}
        {[
          { title: "High priority", items: high, accent: "text-destructive" },
          { title: "Medium priority", items: medium, accent: "text-warning" },
          { title: "Low priority", items: low, accent: "text-muted-foreground" },
        ].filter(g => g.items.length > 0).map(group => (
          <div key={group.title} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={cn("h-1.5 w-1.5 rounded-full", group.accent.replace("text-", "bg-"))} />
              <h2 className={cn("text-[11px] font-bold uppercase tracking-[0.16em]", group.accent)}>
                {group.title} · {group.items.length}
              </h2>
            </div>
            <div className="space-y-2">
              {group.items.map(task => {
                const type = taskIcons[task.type];
                const urg = urgencyStyles[task.urgency];
                const Icon = type.icon;
                const daysUntilDue = Math.ceil((new Date(task.dueOn).getTime() - new Date("2026-07-02").getTime()) / (1000 * 60 * 60 * 24));

                return (
                  <Card key={task.id} className="border-border/60 hover:border-border hover:shadow-sm transition-all p-5">
                    <div className="flex items-start gap-4">
                      <div className={cn("h-11 w-11 rounded-lg flex items-center justify-center shrink-0", type.accent)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[14px] font-bold">{task.title}</p>
                          <Badge className={cn(urg.bg, urg.text, "border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0")}>
                            {urg.label}
                          </Badge>
                          <Badge className="bg-muted text-muted-foreground border-0 text-[10px] font-semibold px-1.5 py-0">
                            {type.label}
                          </Badge>
                        </div>
                        <p className="text-[13px] text-muted-foreground mb-2">
                          from <span className="text-foreground font-semibold">{task.actor}</span>
                          {task.amount && (
                            <>
                              {" · "}
                              <span className="font-mono tabular text-foreground font-semibold">
                                {task.currency} {task.amount.toLocaleString()}
                              </span>
                            </>
                          )}
                        </p>
                        <p className="text-[12px] text-muted-foreground leading-relaxed">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-1.5 mt-3 text-[11px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span className={cn("tabular", daysUntilDue <= 2 && "text-destructive font-semibold")}>
                            {daysUntilDue > 0 ? `Due in ${daysUntilDue} days` : "Overdue"}
                          </span>
                          <span className="mx-1">·</span>
                          <span>Received {new Date(task.createdOn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button size="sm" variant="outline" className="h-8 gap-1 text-destructive hover:text-destructive">
                          <X className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                        <Button size="sm" className="h-8 gap-1">
                          <Check className="h-3.5 w-3.5" />
                          Approve
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {MY_TASKS.length === 0 && (
          <Card className="border-border/60 p-12 text-center">
            <Check className="h-10 w-10 text-success mx-auto mb-3" />
            <p className="text-[16px] font-bold mb-1">You&apos;re all caught up!</p>
            <p className="text-[13px] text-muted-foreground">No pending tasks at the moment.</p>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
