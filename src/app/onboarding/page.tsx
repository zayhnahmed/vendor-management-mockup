"use client";

import Link from "next/link";
import { CheckCircle2, Clock3, AlertCircle, ArrowRight, MapPin } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VENDOR_ONBOARDINGS, type OnboardingStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<OnboardingStatus, { bg: string; text: string; label: string; icon: React.ComponentType<{ className?: string }> }> = {
  NOT_STARTED: { bg: "bg-muted", text: "text-muted-foreground", label: "Not started", icon: AlertCircle },
  IN_PROGRESS: { bg: "bg-warning-muted", text: "text-warning", label: "In progress", icon: Clock3 },
  SUBMITTED: { bg: "bg-buyer-muted", text: "text-buyer", label: "Submitted · awaiting review", icon: Clock3 },
  APPROVED: { bg: "bg-success-muted", text: "text-success", label: "Approved", icon: CheckCircle2 },
  REJECTED: { bg: "bg-destructive/10", text: "text-destructive", label: "Rejected · resubmit", icon: AlertCircle },
};

export default function OnboardingListPage() {
  return (
    <AppShell variant="vendor">
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
            Onboarding
          </p>
          <h1 className="text-[30px] font-bold tracking-[-0.025em]">My Onboarding Progress</h1>
          <p className="text-[14px] text-muted-foreground mt-1.5">
            Complete the 3-step qualification form for each buyer relationship.
          </p>
        </div>

        {/* Explainer card */}
        <Card className="border-border/60 bg-gradient-to-br from-background to-muted/40 p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-md bg-vendor-muted text-vendor flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[13px] font-bold mb-0.5">How onboarding works</p>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Each buyer sets their own qualification requirements. You&apos;ll fill out three sections &mdash;
                General info, Financial info, and Compliance &mdash; then submit for the buyer&apos;s approval.
                Once approved, you can receive RFQs and start trading.
              </p>
            </div>
          </div>
        </Card>

        {/* LIST */}
        <div className="space-y-3">
          {VENDOR_ONBOARDINGS.map((rel) => {
            const s = statusStyles[rel.status];
            const Icon = s.icon;
            return (
              <Card key={rel.id} className="border-border/60 hover:border-border transition-all p-5">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-buyer-muted text-buyer flex items-center justify-center font-bold text-[13px] shrink-0">
                    {rel.buyerShort}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[15px] font-bold truncate">{rel.buyerName}</p>
                      <Badge className={cn(s.bg, s.text, "border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0 gap-1")}>
                        <Icon className="h-2.5 w-2.5" />
                        {s.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-3">
                      <MapPin className="h-2.5 w-2.5" />
                      <span>{rel.buyerCity}, {rel.buyerCountry}</span>
                      <span className="mx-1">·</span>
                      <span>{rel.category}</span>
                      <span className="mx-1">·</span>
                      <span>Last updated {new Date(rel.updatedOn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className={cn(
                            "h-1.5 flex-1 rounded-full",
                            n <= rel.currentStep && (rel.status === "APPROVED" || rel.status === "SUBMITTED") && "bg-success",
                            n <= rel.currentStep && rel.status === "IN_PROGRESS" && "bg-vendor",
                            n > rel.currentStep && "bg-muted"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground tabular">
                      Step {rel.currentStep} of 3
                      {rel.status === "IN_PROGRESS" && ` · ${["General info", "Financial info", "Compliance"][rel.currentStep - 1]}`}
                      {rel.status === "APPROVED" && " · You can now trade with this buyer"}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <Link href={`/onboarding/${rel.id}`}>
                      <button className="inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-primary text-primary-foreground text-[13px] font-semibold hover:bg-primary/90 transition-colors">
                        {rel.status === "IN_PROGRESS" && "Continue"}
                        {rel.status === "APPROVED" && "View"}
                        {rel.status === "SUBMITTED" && "View"}
                        {rel.status === "REJECTED" && "Resubmit"}
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
    </AppShell>
  );
}
