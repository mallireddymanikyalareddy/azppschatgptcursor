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
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Enterprise operations overview with mock metrics. Connect real data sources in a later sprint."
        actions={
          <div className="flex flex-wrap gap-2">
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
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {MOCK_DASHBOARD_STATS.map((stat) => (
            <Card key={stat.id}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-3xl tabular-nums">
                  {stat.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-1 text-sm">
                <p>{stat.hint}</p>
                {stat.trend ? (
                  <p className="text-foreground/80 text-xs">{stat.trend}</p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-label="Recent activity">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Mock timeline of platform events. No live feed connected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-border divide-y">
              {MOCK_RECENT_ACTIVITY.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.detail}
                    </p>
                  </div>
                  <time className="text-muted-foreground text-xs whitespace-nowrap">
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
