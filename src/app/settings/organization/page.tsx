"use client";

import { useState } from "react";
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  Plus,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BUYER_USER, ORG_MEMBERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  ACTIVE: { bg: "bg-success-muted", text: "text-success", label: "Active" },
  INVITED: { bg: "bg-warning-muted", text: "text-warning", label: "Invited" },
  SUSPENDED: { bg: "bg-destructive/10", text: "text-destructive", label: "Suspended" },
};

type Tab = "PROFILE" | "USERS" | "ENROLMENT";

export default function OrganizationSettingsPage() {
  const [tab, setTab] = useState<Tab>("PROFILE");
  const org = BUYER_USER.organization;

  return (
    <AppShell variant="buyer">
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2">
            Settings
          </p>
          <h1 className="text-[30px] font-bold tracking-[-0.025em]">Organization</h1>
          <p className="text-[14px] text-muted-foreground mt-1.5">
            Manage your company profile, users, and enrolment status.
          </p>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-1 mb-6 border-b border-border/60">
          {([
            ["PROFILE", "Profile"],
            ["USERS", "Users"],
            ["ENROLMENT", "Enrolment"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "px-4 py-2.5 text-[13px] font-semibold transition-colors border-b-2",
                tab === key ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "PROFILE" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Info card */}
            <Card className="lg:col-span-2 border-border/60 p-6">
              <div className="flex items-start gap-4 pb-6 mb-6 border-b border-border/60">
                <div className="h-16 w-16 rounded-lg bg-buyer-muted text-buyer flex items-center justify-center font-bold text-[20px]">
                  {org.short}
                </div>
                <div className="flex-1">
                  <p className="text-[20px] font-bold">{org.name}</p>
                  <p className="text-[13px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    {org.city}, {org.country}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge className="bg-buyer-muted text-buyer border-0 text-[10px] font-bold uppercase tracking-wider">Buyer</Badge>
                    <Badge className="bg-success-muted text-success border-0 text-[10px] font-bold uppercase tracking-wider">Verified</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-9">Change logo</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-[12px] font-semibold">Legal name</Label>
                  <Input defaultValue="North Harbor Trading Company Limited" className="mt-1.5 h-10 text-[13px]" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Trading name</Label>
                  <Input defaultValue={org.name} className="mt-1.5 h-10 text-[13px]" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Registration number</Label>
                  <Input defaultValue="1010478392" className="mt-1.5 h-10 text-[13px] font-mono" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Tax / VAT number</Label>
                  <Input defaultValue="300123456700003" className="mt-1.5 h-10 text-[13px] font-mono" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Website</Label>
                  <Input defaultValue="https://northharbor.sa" className="mt-1.5 h-10 text-[13px]" />
                </div>
                <div>
                  <Label className="text-[12px] font-semibold">Industry</Label>
                  <Input defaultValue="Industrial Trading" className="mt-1.5 h-10 text-[13px]" />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-[12px] font-semibold">Registered address</Label>
                  <Input defaultValue="King Fahd Road, Al Olaya District, Riyadh 12211, Saudi Arabia" className="mt-1.5 h-10 text-[13px]" />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Save changes</Button>
              </div>
            </Card>

            {/* Contact card */}
            <div className="space-y-4">
              <Card className="border-border/60 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-4">Primary contact</p>
                <div className="space-y-3 text-[13px]">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-semibold">{BUYER_USER.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{BUYER_USER.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    <span className="font-mono tabular">+966 11 234 5678</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-3.5 w-3.5" />
                    <span>English · Arabic</span>
                  </div>
                </div>
              </Card>

              <Card className="border-border/60 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-3">Platform stats</p>
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] text-muted-foreground">Member since</span>
                    <span className="text-[13px] font-semibold tabular">Feb 2025</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] text-muted-foreground">Total RFQs</span>
                    <span className="text-[13px] font-semibold tabular">147</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] text-muted-foreground">Total spend</span>
                    <span className="text-[13px] font-semibold tabular">SAR 4.2M</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] text-muted-foreground">Active vendors</span>
                    <span className="text-[13px] font-semibold tabular">28</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab === "USERS" && (
          <>
            <div className="flex items-center gap-2 mb-5">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-9 h-9 text-[13px]" />
              </div>
              <div className="flex-1" />
              <Button size="sm" className="h-9 gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Invite user
              </Button>
            </div>
            <Card className="border-border/60">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">User</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Role</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Status</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Joined</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Last active</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ORG_MEMBERS.map(m => {
                    const s = statusStyles[m.status];
                    return (
                      <TableRow key={m.id} className="border-border/40 hover:bg-muted/30">
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-buyer text-white flex items-center justify-center font-bold text-[12px]">
                              {m.initials}
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold">{m.name}</p>
                              <p className="text-[11px] text-muted-foreground">{m.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-[13px] font-medium">{m.role}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn(s.bg, s.text, "border-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0")}>
                            {s.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-[12px] tabular text-muted-foreground">
                            {new Date(m.joinedOn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-[12px] text-muted-foreground">{m.lastActive}</span>
                        </TableCell>
                        <TableCell>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </>
        )}

        {tab === "ENROLMENT" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { role: "BUYER", enrolled: true, since: "Feb 2025", accent: "bg-buyer-muted text-buyer border-buyer/20", label: "Buyer" },
              { role: "VENDOR", enrolled: false, accent: "bg-vendor-muted text-vendor border-vendor/20", label: "Vendor" },
            ].map(r => (
              <Card key={r.role} className={cn("border p-6", r.enrolled ? r.accent : "border-border/60")}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-1">
                      {r.role === "BUYER" ? "Purchase side" : "Supply side"}
                    </p>
                    <p className="text-[18px] font-bold">Enrolled as {r.label}</p>
                  </div>
                  {r.enrolled ? (
                    <Badge className="bg-success-muted text-success border-0 text-[10px] font-bold uppercase tracking-wider">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-muted text-muted-foreground border-0 text-[10px] font-bold uppercase tracking-wider">
                      Not enrolled
                    </Badge>
                  )}
                </div>
                {r.enrolled ? (
                  <p className="text-[13px] text-muted-foreground">
                    You&apos;ve been enrolled as a {r.label.toLowerCase()} since <span className="font-semibold text-foreground">{r.since}</span>. All buyer features are available in your workspace.
                  </p>
                ) : (
                  <>
                    <p className="text-[13px] text-muted-foreground mb-4">
                      Want to sell to other companies on the platform? Request to become a {r.label.toLowerCase()} and unlock vendor tools.
                    </p>
                    <Button size="sm" variant="outline">Request {r.label} enrolment</Button>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
