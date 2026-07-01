"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArbhasoftMark } from "@/components/arbhasoft-mark";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // Animated KPI counter — wow moment
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const target = 34125;
    const duration = 1600;
    const start = performance.now() + 600; // small delay to breathe
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.max(0, now - start);
      const p = Math.min(t / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => router.push("/dashboard"), 400);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* AURORA BLOBS — animated brand color */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="aurora-blob aurora-blob-1"
          style={{
            width: "55vw",
            height: "55vw",
            top: "-15%",
            left: "-10%",
            background:
              "radial-gradient(circle, var(--buyer) 0%, transparent 70%)",
            opacity: 0.22,
          }}
        />
        <div
          className="aurora-blob aurora-blob-2"
          style={{
            width: "50vw",
            height: "50vw",
            bottom: "-15%",
            right: "-8%",
            background:
              "radial-gradient(circle, var(--vendor) 0%, transparent 70%)",
            opacity: 0.18,
          }}
        />
        <div
          className="aurora-blob aurora-blob-3"
          style={{
            width: "40vw",
            height: "40vw",
            top: "35%",
            left: "45%",
            background:
              "radial-gradient(circle, var(--admin) 0%, transparent 70%)",
            opacity: 0.12,
          }}
        />
      </div>

      {/* GRID OVERLAY */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* CONTENT */}
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* LEFT — brand story + preview cards */}
        <section className="relative flex flex-col p-8 sm:p-10 lg:p-14 lg:w-[56%] lg:min-h-screen">
          {/* Mark */}
          <div
            className="flex items-center gap-2.5 mb-12 lg:mb-16 fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <ArbhasoftMark className="h-9 w-9" />
            <span className="font-bold tracking-[0.14em] text-[13px] uppercase text-foreground">
              Arbhasoft
            </span>
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-admin-muted text-admin text-[10px] font-semibold uppercase tracking-widest">
              <Sparkles className="h-2.5 w-2.5" />
              v1.0
            </span>
          </div>

          {/* Hero */}
          <div
            className="max-w-[600px] fade-up"
            style={{ animationDelay: "150ms" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground mb-6 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-foreground/25" />
              The Vendor Management Platform
            </p>
            <h1 className="text-[56px] sm:text-[68px] lg:text-[82px] leading-[0.9] font-bold tracking-[-0.045em] text-foreground">
              Where{" "}
              <span className="text-buyer">buyers</span>
              <br />
              and <span className="text-vendor">vendors</span>
              <br />
              meet.
            </h1>
            <p className="mt-8 text-[16px] leading-relaxed text-muted-foreground max-w-[460px] font-medium">
              One workspace for procurement — from the first quote request to
              the last invoice paid. Built for enterprise. Loved by teams.
            </p>
          </div>

          {/* Two overlapping preview cards — the "Between" visual */}
          <div
            className="relative mt-10 lg:mt-14 mb-auto fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="relative w-full max-w-[560px] h-[220px]">
              {/* Back card — vendor quote */}
              <div className="absolute top-8 right-4 sm:right-12 w-[280px] float-2">
                <div className="p-5 rounded-xl bg-card/95 border border-border shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-vendor" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-vendor">
                      Vendor Quote
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold mb-2 truncate">
                    Emirates Steel Co.
                  </p>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      SAR
                    </span>
                    <span className="text-[24px] font-bold tracking-[-0.02em] tabular text-foreground">
                      32,450
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    14 days lead time
                  </p>
                  <div className="mt-3 pt-3 border-t border-border/60 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-success">
                      Winning bid
                    </span>
                  </div>
                </div>
              </div>

              {/* Front card — buyer request */}
              <div className="absolute top-0 left-0 w-[300px] float-1">
                <div className="p-5 rounded-xl bg-card/95 border border-border shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-buyer" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-buyer">
                      Buyer Request
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold mb-2 line-clamp-1">
                    Steel bearings &amp; lubricants — Q4
                  </p>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      SAR
                    </span>
                    <span className="text-[24px] font-bold tracking-[-0.02em] tabular text-foreground">
                      {count.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    4 vendors invited · 2 quoted
                  </p>
                  <div className="mt-3 pt-3 border-t border-border/60 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-buyer" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-buyer">
                      Distributed
                    </span>
                  </div>
                </div>
              </div>

              {/* Meeting hint arrow between the two */}
              <div className="hidden sm:block absolute top-[40%] left-[38%] w-16 h-px bg-gradient-to-r from-buyer via-admin to-vendor opacity-60" />
            </div>
          </div>

          {/* Trust strip */}
          <div
            className="mt-12 pt-8 border-t border-border/50 fade-up"
            style={{ animationDelay: "700ms" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground mb-4">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] font-bold text-foreground/60">
              <span>North Harbor Trading</span>
              <span>Emirates Steel</span>
              <span>Delta Cement</span>
              <span>Gulf Office Supplies</span>
              <span className="hidden lg:inline">Riyadh Lighting</span>
            </div>
          </div>
        </section>

        {/* RIGHT — sign-in form */}
        <section className="relative flex-1 flex items-center justify-center p-8 sm:p-12 lg:min-h-screen">
          {/* Subtle backdrop card on the right */}
          <div className="absolute inset-0 lg:bg-background/60 lg:backdrop-blur-sm lg:border-l lg:border-border/50 pointer-events-none" />

          <div
            className="relative w-full max-w-[400px] fade-up"
            style={{ animationDelay: "250ms" }}
          >
            {/* Header row: theme toggle top-right of form */}
            <div className="flex items-center justify-end mb-10">
              <ThemeToggle />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">
              Sign in
            </p>
            <h2 className="text-[36px] sm:text-[42px] leading-[1.02] font-bold tracking-[-0.03em] mb-2">
              Welcome back.
            </h2>
            <p className="text-[15px] text-muted-foreground mb-10 font-medium">
              Continue to your procurement workspace.
            </p>

            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-[12px] font-semibold"
                >
                  Work email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 text-[14px] font-medium bg-background/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-[12px] font-semibold"
                  >
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="h-3 w-3" /> Hide
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3" /> Show
                      </>
                    )}
                  </button>
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 text-[14px] font-medium bg-background/50 backdrop-blur-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 mt-3 group text-[14px] font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              >
                {submitting ? "Signing in..." : "Sign in"}
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </form>

            <div className="mt-10 pt-6 border-t border-border/60">
              <p className="text-[13px] text-muted-foreground font-medium">
                New to Arbhasoft?{" "}
                <Link
                  href="/register"
                  className="text-foreground font-bold hover:text-primary transition-colors underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-primary"
                >
                  Register your organisation →
                </Link>
              </p>
            </div>

            {/* Stats strip under form */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { value: "SOC 2", label: "Compliant" },
                { value: "99.9%", label: "Uptime" },
                { value: "SAP", label: "Native" },
              ].map((s, i) => (
                <div
                  key={s.value}
                  className={
                    i === 1
                      ? "text-center border-x border-border/60 py-1"
                      : "text-center py-1"
                  }
                >
                  <p className="text-[17px] font-bold tabular tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <p className="mt-14 text-[11px] font-medium text-muted-foreground/70 text-center">
              © 2026 Arbhasoft · Riyadh · Dubai
              <span className="mx-2 text-border">·</span>
              <span className="font-mono tabular">v1.0</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
