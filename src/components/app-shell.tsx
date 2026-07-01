"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Receipt,
  Package,
  Users,
  CheckSquare,
  Settings,
  Building2,
  ShieldCheck,
  Workflow,
  Search,
  Bell,
  ChevronDown,
  Compass,
  Link2,
} from "lucide-react";
import { ArbhasoftMark } from "@/components/arbhasoft-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  BUYER_USER,
  VENDOR_USER,
  ADMIN_USER,
  type OrgUser,
} from "@/lib/mock-data";

type Variant = "buyer" | "vendor" | "admin";

interface Props {
  variant: Variant;
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}
interface NavGroup {
  label: string;
  items: NavItem[];
}

const buyerNav: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Commerce",
    items: [
      { label: "Quote Requests", href: "/rfqs/rfq_007", icon: FileText, badge: "4" },
      { label: "Purchase Orders", href: "/purchase-orders", icon: ShoppingCart },
      { label: "Invoices", href: "/invoices", icon: Receipt, badge: "3" },
      { label: "Materials", href: "/materials", icon: Package },
    ],
  },
  {
    label: "Network",
    items: [
      { label: "Vendors", href: "/vendors", icon: Users },
      { label: "Discover", href: "/discover", icon: Compass },
      { label: "Connections", href: "/connections", icon: Link2 },
    ],
  },
  {
    label: "Approvals",
    items: [{ label: "My Tasks", href: "/my-tasks", icon: CheckSquare, badge: "3" }],
  },
  {
    label: "Settings",
    items: [{ label: "Organization", href: "/settings/organization", icon: Settings }],
  },
];

const vendorNav: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/vendor", icon: LayoutDashboard }],
  },
  {
    label: "Commerce",
    items: [
      { label: "Quote Requests", href: "/vendor", icon: FileText, badge: "5" },
      { label: "Purchase Orders", href: "/purchase-orders", icon: ShoppingCart },
      { label: "Invoices", href: "/invoices", icon: Receipt },
      { label: "My Catalogue", href: "/materials", icon: Package },
    ],
  },
  {
    label: "Network",
    items: [
      { label: "Buyers", href: "/vendors", icon: Users },
      { label: "Discover", href: "/discover", icon: Compass },
      { label: "Connections", href: "/connections", icon: Link2 },
    ],
  },
  {
    label: "Onboarding",
    items: [{ label: "My Progress", href: "/my-tasks", icon: CheckSquare }],
  },
  {
    label: "Settings",
    items: [{ label: "Organization", href: "/settings/organization", icon: Settings }],
  },
];

const adminNav: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Platform",
    items: [
      { label: "Organizations", href: "/admin", icon: Building2, badge: "6" },
      { label: "Enrolments", href: "/admin", icon: ShieldCheck, badge: "4" },
      { label: "Workflows", href: "/admin", icon: Workflow },
    ],
  },
];

const users: Record<Variant, OrgUser> = {
  buyer: BUYER_USER,
  vendor: VENDOR_USER,
  admin: ADMIN_USER,
};

const navConfig: Record<Variant, NavGroup[]> = {
  buyer: buyerNav,
  vendor: vendorNav,
  admin: adminNav,
};

const variantLabel: Record<Variant, string> = {
  buyer: "Buyer",
  vendor: "Vendor",
  admin: "Super Admin",
};

const variantAccent: Record<Variant, string> = {
  buyer: "text-buyer",
  vendor: "text-vendor",
  admin: "text-admin",
};

const variantDot: Record<Variant, string> = {
  buyer: "bg-buyer",
  vendor: "bg-vendor",
  admin: "bg-admin",
};

export function AppShell({ variant, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = navConfig[variant];
  const user = users[variant];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* SIDEBAR */}
      <aside className="w-[260px] shrink-0 flex flex-col bg-sidebar border-r border-sidebar-border">
        {/* Brand */}
        <div className="h-16 px-5 flex items-center border-b border-sidebar-border">
          <Link href={variant === "buyer" ? "/dashboard" : variant === "vendor" ? "/vendor" : "/admin"} className="flex items-center gap-2.5">
            <ArbhasoftMark className="h-7 w-7" />
            <span className="font-semibold tracking-[0.12em] text-[12px] uppercase text-sidebar-foreground">
              Arbhasoft
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 h-9 bg-background text-[13px] text-sidebar-foreground placeholder:text-muted-foreground border-sidebar-border"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-0.5 px-1.5 rounded border border-sidebar-border bg-background text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 overflow-y-auto scrollbar-thin">
          {nav.map((group) => (
            <div key={group.label} className="mb-6">
              <p className="px-3 mb-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0", active && variantAccent[variant])} />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] font-medium tabular px-1.5 py-0.5 rounded bg-background text-muted-foreground border border-sidebar-border">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="border-t border-sidebar-border p-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center gap-2.5 p-2 rounded-md hover:bg-sidebar-accent transition-colors text-left cursor-pointer">
              <Avatar className={cn("h-8 w-8 text-[12px] font-semibold", variantDot[variant], "text-white")}>
                <AvatarFallback className={cn(variantDot[variant], "text-white")}>
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-sidebar-foreground truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {user.role}
                </p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-[220px]">
              <div className="px-2 py-1.5">
                <p className="text-[13px] font-semibold">{user.name}</p>
                <p className="text-[11px] text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings/organization")}>Profile</DropdownMenuItem>
              <DropdownMenuItem>Change password</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/login")}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-16 shrink-0 flex items-center justify-between gap-4 px-6 border-b border-border bg-background">
          {/* Left: org context */}
          <div className="flex items-center gap-3 min-w-0">
            <span className={cn("inline-block h-2 w-2 rounded-full", variantDot[variant])} />
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-[14px] font-medium text-foreground truncate">
                {user.organization.name}
              </span>
              <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground shrink-0 hidden md:inline">
                {user.organization.city}
              </span>
            </div>
          </div>

          {/* Right: role switcher (demo), theme, bell, user */}
          <div className="flex items-center gap-2">
            {variant === "admin" ? (
              /* SUPER ADMIN — no role toggle. Just portal identity + demo return link. */
              <>
                <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md bg-admin-muted text-admin border border-admin/20 text-[11px] font-bold uppercase tracking-[0.14em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-admin" />
                  Arbhasoft · Platform
                </span>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors border-l border-border pl-3 ml-1"
                  title="Demo navigation — jump to an organisation portal"
                >
                  ← Org portal <span className="text-muted-foreground/60">(demo)</span>
                </button>
              </>
            ) : (
              /* ORG PORTAL — Buyer ⇄ Vendor dual-role toggle */
              <>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground hidden md:inline">
                  View as
                </span>
                <div className="inline-flex items-center gap-0.5 p-0.5 bg-muted rounded-md border border-border">
                  <button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 h-7 rounded text-[12px] font-semibold transition-all",
                      variant === "buyer"
                        ? "bg-background text-buyer shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label="Switch to Buyer view"
                    aria-pressed={variant === "buyer"}
                  >
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      variant === "buyer" ? "bg-buyer" : "bg-muted-foreground/40"
                    )} />
                    Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/vendor")}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 h-7 rounded text-[12px] font-semibold transition-all",
                      variant === "vendor"
                        ? "bg-background text-vendor shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label="Switch to Vendor view"
                    aria-pressed={variant === "vendor"}
                  >
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      variant === "vendor" ? "bg-vendor" : "bg-muted-foreground/40"
                    )} />
                    Vendor
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/admin")}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors border-l border-border pl-3 ml-1 hidden lg:inline-flex items-center gap-1"
                  title="Demo navigation — jump to Arbhasoft's own platform admin portal"
                >
                  Platform admin <span className="text-muted-foreground/60">(demo)</span> →
                </button>
              </>
            )}

            <ThemeToggle />

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[9px] bg-vendor text-white border-0 rounded-full flex items-center justify-center">
                3
              </Badge>
            </Button>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
