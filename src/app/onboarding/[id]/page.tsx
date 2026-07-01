"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Upload,
  FileText,
  Landmark,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VENDOR_ONBOARDINGS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

const stepInfo = [
  { icon: Building2, label: "General Info", description: "Company details, contacts, business type" },
  { icon: Landmark, label: "Financial Info", description: "Banking, tax, financial history" },
  { icon: ShieldCheck, label: "Compliance", description: "Policies, certifications, sustainability" },
];

export default function VendorOnboardingWizard() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const rel = VENDOR_ONBOARDINGS.find(r => r.id === params.id) ?? VENDOR_ONBOARDINGS[1];
  const [step, setStep] = React.useState<Step>(rel.currentStep as Step);
  const [saved, setSaved] = React.useState(false);

  const next = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    setStep((s) => Math.min(3, s + 1) as Step);
  };
  const back = () => setStep((s) => Math.max(1, s - 1) as Step);
  const submit = () => {
    setSaved(true);
    setTimeout(() => router.push("/onboarding"), 800);
  };

  return (
    <AppShell variant="vendor">
      <div className="max-w-[900px] mx-auto px-8 py-8">
        {/* BREADCRUMB */}
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to onboarding
        </Link>

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
            Onboarding &middot; {rel.buyerShort}
          </p>
          <h1 className="text-[28px] font-bold tracking-[-0.025em]">
            Qualification form for <span className="text-buyer">{rel.buyerName}</span>
          </h1>
          <p className="text-[14px] text-muted-foreground mt-1.5">
            Complete all three steps to be eligible to receive RFQs from this buyer.
          </p>
        </div>

        {/* STEPPER */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stepInfo.map((info, i) => {
            const n = (i + 1) as Step;
            const active = step === n;
            const done = step > n;
            const Icon = info.icon;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setStep(n)}
                className={cn(
                  "text-left p-4 rounded-lg border transition-all",
                  active && "border-primary bg-primary/5",
                  done && "border-success/40 bg-success-muted/40",
                  !active && !done && "border-border hover:border-border/80"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn(
                    "h-7 w-7 rounded-md flex items-center justify-center",
                    active && "bg-primary text-primary-foreground",
                    done && "bg-success text-white",
                    !active && !done && "bg-muted text-muted-foreground"
                  )}>
                    {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Step {n}
                  </span>
                </div>
                <p className="text-[13px] font-bold">{info.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{info.description}</p>
              </button>
            );
          })}
        </div>

        {/* FORM */}
        <Card className="border-border/60 p-6 mb-4">
          {step === 1 && (
            <div className="space-y-5">
              <div className="pb-4 border-b border-border/60">
                <h2 className="text-[17px] font-bold">General information</h2>
                <p className="text-[13px] text-muted-foreground mt-0.5">
                  Basic details about your company. This section is shared across all your buyer relationships.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[12px] font-semibold">Legal name *</Label>
                  <Input defaultValue="Emirates Steel Co. LLC" className="mt-1.5 h-11 text-[14px]" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Trade name</Label>
                  <Input defaultValue="Emirates Steel" className="mt-1.5 h-11 text-[14px]" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Country of registration *</Label>
                  <Input defaultValue="United Arab Emirates" className="mt-1.5 h-11 text-[14px]" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Year established</Label>
                  <Input defaultValue="2001" className="mt-1.5 h-11 text-[14px] font-mono tabular" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Entity type *</Label>
                  <Input defaultValue="Private (LLC)" className="mt-1.5 h-11 text-[14px]" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Business type *</Label>
                  <Input defaultValue="Manufacturer, Distributor" className="mt-1.5 h-11 text-[14px]" />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-[12px] font-semibold">Registered address *</Label>
                  <Input defaultValue="ICAD 1, Musaffah Industrial Area, Abu Dhabi, UAE" className="mt-1.5 h-11 text-[14px]" />
                </div>
              </div>

              <div className="pt-4 border-t border-border/60">
                <h3 className="text-[14px] font-bold mb-3">Primary contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[12px] font-semibold">Full name *</Label>
                    <Input defaultValue="Fatima Al-Hashemi" className="mt-1.5 h-11 text-[14px]" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">Designation *</Label>
                    <Input defaultValue="Key Accounts Lead" className="mt-1.5 h-11 text-[14px]" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">Email *</Label>
                    <Input defaultValue="fatima@emiratessteel.ae" className="mt-1.5 h-11 text-[14px]" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">Phone *</Label>
                    <Input defaultValue="+971 2 555 7788" className="mt-1.5 h-11 text-[14px] font-mono tabular" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="pb-4 border-b border-border/60">
                <h2 className="text-[17px] font-bold">Financial information</h2>
                <p className="text-[13px] text-muted-foreground mt-0.5">
                  Banking details for payment processing and your financial standing.
                </p>
              </div>

              <div>
                <h3 className="text-[14px] font-bold mb-3">Bank account</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[12px] font-semibold">Bank name *</Label>
                    <Input placeholder="Emirates NBD" className="mt-1.5 h-11 text-[14px]" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">SWIFT / BIC code *</Label>
                    <Input placeholder="EBILAEAD" className="mt-1.5 h-11 text-[14px] font-mono tabular" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">Account holder name *</Label>
                    <Input placeholder="Emirates Steel Co. LLC" className="mt-1.5 h-11 text-[14px]" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">IBAN</Label>
                    <Input placeholder="AE07 0331 2345 6789 0123 456" className="mt-1.5 h-11 text-[14px] font-mono tabular" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">Bank country *</Label>
                    <Input placeholder="United Arab Emirates" className="mt-1.5 h-11 text-[14px]" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">Account currency *</Label>
                    <Input placeholder="AED" className="mt-1.5 h-11 text-[14px] font-mono" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60">
                <h3 className="text-[14px] font-bold mb-3">Tax & financial history</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[12px] font-semibold">Tax / VAT registration *</Label>
                    <Input placeholder="100 123 456 700003" className="mt-1.5 h-11 text-[14px] font-mono tabular" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">Years in business *</Label>
                    <Input placeholder="25" className="mt-1.5 h-11 text-[14px] font-mono tabular" />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-[12px] font-semibold">Annual turnover (in account currency) *</Label>
                    <Input placeholder="42,000,000" className="mt-1.5 h-11 text-[14px] font-mono tabular" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="pb-4 border-b border-border/60">
                <h2 className="text-[17px] font-bold">Compliance & certifications</h2>
                <p className="text-[13px] text-muted-foreground mt-0.5">
                  Declarations, policies, and certifications required by this buyer.
                </p>
              </div>

              <div>
                <h3 className="text-[14px] font-bold mb-3">Declarations</h3>
                <div className="space-y-2">
                  {[
                    { label: "Company complies with local labor laws", checked: true },
                    { label: "Has an active Health, Safety & Environment (HSE) policy", checked: true },
                    { label: "Has an anti-bribery / anti-corruption policy", checked: true },
                    { label: "Company has no pending or unresolved legal issues", checked: true },
                  ].map((d, i) => (
                    <label key={i} className="flex items-start gap-3 p-3 rounded-md border border-border hover:bg-muted/30 cursor-pointer">
                      <input type="checkbox" defaultChecked={d.checked} className="mt-0.5 h-4 w-4 rounded accent-primary" />
                      <span className="text-[13px] font-medium">{d.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/60">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[14px] font-bold">Certifications</h3>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 text-[12px]">
                    <Upload className="h-3 w-3" />
                    Add certification
                  </Button>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "ISO 9001:2015 · Quality Management", issuer: "TÜV Rheinland", validUntil: "30 April 2027" },
                    { name: "ISO 14001:2015 · Environmental", issuer: "Bureau Veritas", validUntil: "15 November 2026" },
                    { name: "OHSAS 45001 · Occupational Health & Safety", issuer: "DNV", validUntil: "10 August 2027" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-md border border-border">
                      <div className="h-9 w-9 rounded-md bg-success-muted text-success flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold">{c.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Issued by {c.issuer} · Valid until <span className="tabular">{c.validUntil}</span>
                        </p>
                      </div>
                      <Badge className="bg-success-muted text-success border-0 text-[10px] font-bold uppercase tracking-wider">
                        Valid
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/60">
                <Label className="text-[14px] font-bold">Sustainability practices <span className="font-normal text-muted-foreground text-[12px]">(optional)</span></Label>
                <p className="text-[11px] text-muted-foreground mt-1 mb-3">Comma-separated list.</p>
                <Input defaultValue="Solar-powered warehouse, Water reclamation, Green fleet initiative" className="h-11 text-[13px]" />
              </div>
            </div>
          )}
        </Card>

        {/* NAV */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={back} className="h-10 gap-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Button>
            )}
            {saved && (
              <span className="text-[12px] text-success font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Saved
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="h-10 text-muted-foreground">
              Save as draft
            </Button>
            {step < 3 && (
              <Button onClick={next} className="h-10 gap-1 font-semibold">
                Continue
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}
            {step === 3 && (
              <Button onClick={submit} className="h-10 gap-1 font-semibold shadow-lg shadow-primary/25">
                Submit for approval
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
