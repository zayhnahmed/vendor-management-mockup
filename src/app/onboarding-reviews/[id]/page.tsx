"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  X,
  Building2,
  Landmark,
  ShieldCheck,
  FileText,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ONBOARDING_SUBMISSIONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function OnboardingReviewDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [dialog, setDialog] = React.useState<"approve" | "reject" | null>(null);
  const [reason, setReason] = React.useState("");
  const sub = ONBOARDING_SUBMISSIONS.find(s => s.id === params.id) ?? ONBOARDING_SUBMISSIONS[0];

  const handleAction = (action: "approve" | "reject") => {
    setDialog(null);
    setTimeout(() => router.push("/onboarding-reviews"), 400);
  };

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* BACK */}
        <Link
          href="/onboarding-reviews"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to onboarding reviews
        </Link>

        {/* HEADER */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex items-start gap-4 min-w-0">
            <div className="h-16 w-16 rounded-lg bg-vendor-muted text-vendor flex items-center justify-center font-bold text-[18px] shrink-0">
              {sub.vendorShort}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Vendor onboarding
                </p>
                <Badge className="bg-warning-muted text-warning border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0">
                  Awaiting your review
                </Badge>
              </div>
              <h1 className="text-[26px] font-bold tracking-[-0.025em]">{sub.vendorName}</h1>
              <p className="text-[13px] text-muted-foreground mt-1 flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {sub.vendorCity}, {sub.vendorCountry}
                <span className="mx-1">·</span>
                Submitted {new Date(sub.submittedOn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 text-destructive hover:text-destructive"
              onClick={() => setDialog("reject")}
            >
              <X className="h-3.5 w-3.5" />
              Reject
            </Button>
            <Button
              size="sm"
              className="h-9 gap-1.5 bg-success text-white hover:bg-success/90"
              onClick={() => setDialog("approve")}
            >
              <Check className="h-3.5 w-3.5" />
              Approve
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* MAIN */}
          <div className="space-y-4">
            {/* STEP 1 — General */}
            <Card className="border-border/60 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-md bg-buyer-muted text-buyer flex items-center justify-center">
                  <Building2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Step 1</p>
                  <p className="text-[15px] font-bold">General information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Legal name" value={sub.companyLegalName} />
                <Field label="Trade name" value={sub.tradeName} />
                <Field label="Country" value={sub.vendorCountry} />
                <Field label="Year of establishment" value={sub.yearOfEstablishment.toString()} mono />
                <Field label="Entity type" value={sub.entityType} />
                <Field label="Business type" value={sub.businessType.join(", ")} />
                <div className="md:col-span-2">
                  <Field label="Registered address" value={sub.registeredAddress} />
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-border/60">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Primary contact</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Name" value={`${sub.primaryContactName} · ${sub.designation}`} />
                  <Field label="Email" value={sub.primaryContactEmail} icon={Mail} />
                  <Field label="Phone" value={sub.primaryContactPhone} mono icon={Phone} />
                </div>
              </div>
            </Card>

            {/* STEP 2 — Financial */}
            <Card className="border-border/60 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-md bg-vendor-muted text-vendor flex items-center justify-center">
                  <Landmark className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Step 2</p>
                  <p className="text-[15px] font-bold">Financial information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Bank name" value={sub.bankName} />
                <Field label="SWIFT / BIC" value={sub.bankCode} mono />
                <Field label="Account holder" value={sub.accountHolderName} />
                <Field label="Bank country · currency" value={`${sub.bankCountry} · ${sub.currency}`} />
                <Field label="Tax / VAT number" value={sub.taxRegistrationNumber} mono />
                <Field label="Annual turnover" value={`${sub.currency} ${(sub.annualTurnover / 1000000).toFixed(1)}M`} mono />
                <Field label="Years in business" value={sub.yearsInBusiness.toString()} mono />
              </div>
            </Card>

            {/* STEP 3 — Compliance */}
            <Card className="border-border/60 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-md bg-admin-muted text-admin flex items-center justify-center">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Step 3</p>
                  <p className="text-[15px] font-bold">Compliance & certifications</p>
                </div>
              </div>

              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Declarations</p>
              <div className="space-y-2 mb-5">
                {[
                  { label: "Complies with local labour laws", value: sub.compliesWithLaborLaws },
                  { label: "Has an active HSE policy", value: sub.hasHSEPolicy },
                  { label: "Has anti-bribery / anti-corruption policy", value: sub.hasAntiBriberyPolicy },
                  { label: "No pending legal issues", value: !sub.hasLegalIssues },
                ].map((d, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[13px]">
                    {d.value ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className={cn("font-medium", !d.value && "text-destructive")}>{d.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Certifications ({sub.certifications.length})</p>
              <div className="space-y-2 mb-5">
                {sub.certifications.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-md border border-border">
                    <div className="h-9 w-9 rounded-md bg-success-muted text-success flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold">{c.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Issued by {c.issuedBy} · Valid until {new Date(c.validUntil).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <Badge className="bg-success-muted text-success border-0 text-[10px] font-bold uppercase tracking-wider">Valid</Badge>
                  </div>
                ))}
              </div>

              {sub.sustainabilityPractices.length > 0 && (
                <>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Sustainability practices</p>
                  <div className="flex flex-wrap gap-2">
                    {sub.sustainabilityPractices.map((p, i) => (
                      <Badge key={i} className="bg-muted text-foreground border border-border text-[11px] font-semibold px-2 py-0.5">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-4">
            <Card className="border-border/60 p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Reviewer notes</p>
              <textarea
                placeholder="Optional notes for internal records..."
                className="w-full h-24 bg-background border border-border rounded-md p-2.5 text-[12px] font-medium resize-none focus:outline-none focus:border-primary"
              />
              <div className="mt-4 pt-4 border-t border-border/60 space-y-2">
                <Button
                  className="w-full h-10 bg-success text-white hover:bg-success/90 gap-1.5 font-semibold"
                  onClick={() => setDialog("approve")}
                >
                  <Check className="h-4 w-4" />
                  Approve vendor
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-10 text-destructive hover:text-destructive gap-1.5 font-semibold"
                  onClick={() => setDialog("reject")}
                >
                  <X className="h-4 w-4" />
                  Reject with reason
                </Button>
              </div>
            </Card>

            <Card className="border-border/60 p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Review checklist</p>
              <div className="space-y-2 text-[12px]">
                {[
                  "General info complete",
                  "Bank details verified",
                  "Tax registration valid",
                  "ISO 9001 certificate valid",
                  "HSE policy declared",
                  "No red flags in compliance",
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="h-3.5 w-3.5 rounded accent-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </label>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* APPROVE / REJECT MODAL */}
        {dialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <Card className="w-full max-w-[440px] border-border p-6">
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center mb-4",
                dialog === "approve" ? "bg-success-muted text-success" : "bg-destructive/10 text-destructive"
              )}>
                {dialog === "approve" ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
              </div>
              <h3 className="text-[18px] font-bold mb-1.5">
                {dialog === "approve" ? "Approve this vendor?" : "Reject this submission?"}
              </h3>
              <p className="text-[13px] text-muted-foreground mb-4">
                {dialog === "approve"
                  ? `${sub.vendorName} will become an approved vendor and can receive RFQs from you starting today.`
                  : `${sub.vendorName} will be notified and can revise and resubmit. Please provide a reason.`}
              </p>
              {dialog === "reject" && (
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for rejection (shown to the vendor)..."
                  className="w-full h-24 bg-background border border-border rounded-md p-2.5 text-[13px] font-medium resize-none mb-4 focus:outline-none focus:border-primary"
                />
              )}
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={() => setDialog(null)}>Cancel</Button>
                <Button
                  className={dialog === "approve" ? "bg-success text-white hover:bg-success/90" : "bg-destructive text-white hover:bg-destructive/90"}
                  onClick={() => handleAction(dialog)}
                >
                  {dialog === "approve" ? "Yes, approve" : "Reject vendor"}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Field({ label, value, mono, icon: Icon }: { label: string; value: string; mono?: boolean; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3 text-muted-foreground" />}
        <p className={cn("text-[13px] font-semibold", mono && "font-mono tabular")}>{value}</p>
      </div>
    </div>
  );
}
