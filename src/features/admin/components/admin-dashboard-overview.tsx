"use client";

import { PageHeader } from "@/components/common/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MOCK_DASHBOARD_STATS,
  MOCK_RECENT_ACTIVITY,
} from "@/features/admin/data/dashboard-mock";
import { useRbac } from "@/features/rbac";

export function AdminDashboardOverview() {
  const { roleDetails, permissions } = useRbac();

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Enterprise operations overview with mock metrics. Connect real data sources in a later sprint."
        actions={
          <div className="flex flex-wrap gap-1.5">
            {roleDetails.map((role) => (
              <Badge key={role.id} variant="secondary">
                {role.name}
              </Badge>
            ))}
            <Badge variant="outline">{permissions.size} permissions</Badge>
          </div>
        }
      />

      <section aria-label="Key metrics">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {MOCK_DASHBOARD_STATS.map((stat) => (
            <Card
              key={stat.id}
              className="hover:border-border/90 hover:bg-card/80 gap-3 py-4 transition-colors"
            >
              <CardHeader className="pb-0">
                <CardDescription className="text-xs tracking-wide uppercase">
                  {stat.label}
                </CardDescription>
                <CardTitle className="font-mono text-3xl tracking-tight tabular-nums">
                  {stat.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-1 text-sm">
                <p>{stat.hint}</p>
                {stat.trend ? (
                  <p className="text-foreground/75 text-xs">{stat.trend}</p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-label="Recent activity">
        <Card className="gap-0 py-0">
          <CardHeader className="border-b py-4">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Mock timeline of platform events. No live feed connected.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <ul className="divide-border divide-y">
              {MOCK_RECENT_ACTIVITY.map((item) => (
                <li
                  key={item.id}
                  className="hover:bg-muted/30 flex flex-col gap-1 px-5 py-3.5 transition-colors sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="border-primary/40 min-w-0 border-l-2 pl-3">
                    <p className="text-sm font-medium tracking-tight">
                      {item.title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {item.detail}
                    </p>
                  </div>
                  <time className="text-muted-foreground font-mono text-[11px] whitespace-nowrap">
                    {item.time}
                  </time>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
