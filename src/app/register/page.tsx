"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  User as UserIcon,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArbhasoftMark } from "@/components/arbhasoft-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<Step>(1);
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const next = () => setStep((s) => Math.min(3, (s + 1) as Step));
  const back = () => setStep((s) => Math.max(1, (s - 1) as Step));

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 600);
  };

  if (done) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground flex items-center justify-center p-8">
        {/* Aurora backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="aurora-blob aurora-blob-1"
            style={{ width: "50vw", height: "50vw", top: "-15%", left: "-10%", background: "radial-gradient(circle, var(--buyer) 0%, transparent 70%)", opacity: 0.15 }}
          />
          <div
            className="aurora-blob aurora-blob-2"
            style={{ width: "45vw", height: "45vw", bottom: "-15%", right: "-8%", background: "radial-gradient(circle, var(--vendor) 0%, transparent 70%)", opacity: 0.12 }}
          />
        </div>
        <div className="absolute inset-0 grid-overlay pointer-events-none" />

        <div className="relative max-w-[520px] text-center fade-up">
          <div className="mx-auto mb-8 h-16 w-16 rounded-full bg-success-muted flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">
            Registration submitted
          </p>
          <h1 className="text-[42px] leading-[1.05] font-bold tracking-[-0.03em] mb-4">
            You&apos;re on the list.
          </h1>
          <p className="text-[15px] text-muted-foreground mb-8 leading-relaxed">
            Your organisation is now under review by Arbhasoft&apos;s platform team.
            You&apos;ll receive an email at{" "}
            <span className="font-semibold text-foreground">ahmed@northharbor.sa</span>{" "}
            once your account is approved &mdash; usually within 1 business day.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button
              size="lg"
              className="h-11 px-6 font-semibold gap-2"
              onClick={() => router.push("/login")}
            >
              Back to sign in
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Aurora + grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="aurora-blob aurora-blob-1"
          style={{ width: "50vw", height: "50vw", top: "-15%", left: "-10%", background: "radial-gradient(circle, var(--buyer) 0%, transparent 70%)", opacity: 0.18 }}
        />
        <div
          className="aurora-blob aurora-blob-2"
          style={{ width: "45vw", height: "45vw", bottom: "-15%", right: "-8%", background: "radial-gradient(circle, var(--vendor) 0%, transparent 70%)", opacity: 0.14 }}
        />
      </div>
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* LEFT — brand */}
        <section className="relative flex flex-col justify-between p-8 lg:p-14 lg:w-[42%] lg:min-h-screen">
          <div className="flex items-center gap-2.5 fade-up">
            <ArbhasoftMark className="h-9 w-9" />
            <span className="font-bold tracking-[0.14em] text-[13px] uppercase text-foreground">
              Arbhasoft
            </span>
          </div>

          <div className="max-w-[440px] py-14 lg:py-0 fade-up" style={{ animationDelay: "150ms" }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground mb-6 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-foreground/25" />
              Join the platform
            </p>
            <h1 className="text-[48px] sm:text-[56px] lg:text-[62px] leading-[0.95] font-bold tracking-[-0.04em]">
              Grow your{" "}
              <span className="text-buyer">buyer</span>
              <br />
              and <span className="text-vendor">vendor</span>
              <br />
              network.
            </h1>
            <p className="mt-7 text-[15px] leading-relaxed text-muted-foreground max-w-[380px]">
              Register your organisation and start trading with hundreds of
              verified companies across the region.
            </p>

            <div className="mt-10 space-y-3">
              {[
                { icon: ShieldCheck, text: "Free to register · Verified by Arbhasoft" },
                { icon: Sparkles, text: "Buyer + vendor tools in one workspace" },
                { icon: CheckCircle2, text: "SAP integrated · SOC 2 compliant" },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[13px] font-medium text-muted-foreground">{f.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-muted-foreground/70 fade-up" style={{ animationDelay: "600ms" }}>
            © 2026 Arbhasoft · Riyadh · Dubai
          </div>
        </section>

        {/* RIGHT — form */}
        <section className="relative flex-1 flex items-start justify-center p-8 lg:p-12 lg:min-h-screen overflow-y-auto">
          <div className="absolute inset-0 lg:bg-background/60 lg:backdrop-blur-sm lg:border-l lg:border-border/50 pointer-events-none" />

          <div className="relative w-full max-w-[440px] py-4 fade-up" style={{ animationDelay: "250ms" }}>
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/login"
                className="text-[12px] font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to sign in
              </Link>
              <ThemeToggle />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">
              Register organisation · Step {step} of 3
            </p>
            <h2 className="text-[30px] sm:text-[34px] leading-[1.05] font-bold tracking-[-0.025em] mb-2">
              {step === 1 && "Tell us about your company."}
              {step === 2 && "Set up the admin account."}
              {step === 3 && "Review & confirm."}
            </h2>
            <p className="text-[14px] text-muted-foreground mb-8 font-medium">
              {step === 1 && "Basic details about your organisation."}
              {step === 2 && "The person who will manage the account."}
              {step === 3 && "One last look before you submit."}
            </p>

            {/* Stepper indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex-1">
                  <div
                    className={cn(
                      "h-1 rounded-full transition-colors",
                      n <= step ? "bg-primary" : "bg-muted"
                    )}
                  />
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-widest mt-1.5",
                    n <= step ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {n === 1 && "Company"}
                    {n === 2 && "Admin"}
                    {n === 3 && "Review"}
                  </p>
                </div>
              ))}
            </div>

            {/* Step content */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <Label className="text-[12px] font-semibold">Organisation name</Label>
                  <Input placeholder="North Harbor Trading Co." defaultValue="North Harbor Trading Co." className="mt-1.5 h-11 text-[14px]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[12px] font-semibold">Legal name</Label>
                    <Input placeholder="Legal name" defaultValue="North Harbor Trading Company Ltd." className="mt-1.5 h-11 text-[14px]" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">Country</Label>
                    <Input placeholder="Country" defaultValue="Saudi Arabia" className="mt-1.5 h-11 text-[14px]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[12px] font-semibold">Tax / VAT number</Label>
                    <Input placeholder="123456789" className="mt-1.5 h-11 text-[14px] font-mono" />
                  </div>
                  <div>
                    <Label className="text-[12px] font-semibold">Registration number</Label>
                    <Input placeholder="CR-1010478392" className="mt-1.5 h-11 text-[14px] font-mono" />
                  </div>
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Registered address</Label>
                  <Input placeholder="Street, City, Postal code" defaultValue="King Fahd Road, Riyadh 12211" className="mt-1.5 h-11 text-[14px]" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">
                    Website <span className="font-normal text-muted-foreground">(optional)</span>
                  </Label>
                  <Input placeholder="https://your-company.com" defaultValue="https://northharbor.sa" className="mt-1.5 h-11 text-[14px]" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <Label className="text-[12px] font-semibold">Full name</Label>
                  <Input placeholder="Your full name" defaultValue="Ahmed Kassim" className="mt-1.5 h-11 text-[14px]" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Work email</Label>
                  <Input type="email" placeholder="you@company.com" defaultValue="ahmed.kassim@northharbor.sa" className="mt-1.5 h-11 text-[14px]" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Phone number</Label>
                  <Input placeholder="+966 11 234 5678" defaultValue="+966 11 234 5678" className="mt-1.5 h-11 text-[14px] font-mono" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Password</Label>
                  <Input type="password" placeholder="At least 6 characters" defaultValue="••••••••••" className="mt-1.5 h-11 text-[14px]" />
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    Must contain letters and numbers, minimum 6 characters.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-3.5 w-3.5 text-primary" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Organisation</p>
                  </div>
                  <div className="space-y-2 text-[13px]">
                    <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-semibold">North Harbor Trading Co.</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Country</span><span className="font-semibold">Saudi Arabia</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Tax / VAT</span><span className="font-mono tabular">300123456700003</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Website</span><span className="text-primary">northharbor.sa</span></div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <UserIcon className="h-3.5 w-3.5 text-primary" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Admin account</p>
                  </div>
                  <div className="space-y-2 text-[13px]">
                    <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-semibold">Ahmed Kassim</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-semibold">ahmed.kassim@northharbor.sa</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-mono tabular">+966 11 234 5678</span></div>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-muted/40 rounded-md text-[12px] text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p>
                    By submitting, you agree to Arbhasoft&apos;s{" "}
                    <a href="#" className="text-foreground font-semibold underline underline-offset-2">terms of service</a>{" "}
                    and{" "}
                    <a href="#" className="text-foreground font-semibold underline underline-offset-2">privacy policy</a>.
                    Your organisation will be reviewed by our platform team before activation.
                  </p>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-8">
              {step > 1 ? (
                <Button variant="outline" onClick={back} className="h-11 gap-1">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              {step < 3 && (
                <Button onClick={next} className="h-11 gap-1 font-semibold ml-auto">
                  Continue
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              )}
              {step === 3 && (
                <Button onClick={submit} disabled={submitting} className="h-11 gap-1 font-semibold ml-auto shadow-lg shadow-primary/25">
                  {submitting ? "Submitting..." : "Submit for review"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
