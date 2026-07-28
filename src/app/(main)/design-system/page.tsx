"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartGrid, ChartPlaceholder } from "@/components/ui/chart-placeholder";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PresetEmptyState } from "@/components/ui/empty-states";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardLoader,
  InlineProgress,
  PageLoader,
  TableLoader,
} from "@/components/ui/loaders";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Radio, RadioItem } from "@/components/ui/radio";
import { SearchBox } from "@/components/ui/search-box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DemoRow = {
  id: string;
  name: string;
  status: string;
  role: string;
};

const demoRows: DemoRow[] = [
  { id: "1", name: "Alex Rivera", status: "Active", role: "Admin" },
  { id: "2", name: "Sam Chen", status: "Invited", role: "Editor" },
  { id: "3", name: "Jordan Lee", status: "Active", role: "Viewer" },
  { id: "4", name: "Casey Kim", status: "Paused", role: "Editor" },
  { id: "5", name: "Riley Park", status: "Active", role: "Admin" },
  { id: "6", name: "Morgan Blake", status: "Invited", role: "Viewer" },
];

const demoColumns: DataTableColumn<DemoRow>[] = [
  {
    id: "name",
    header: "Name",
    sortable: true,
    sortValue: (row) => row.name,
    accessor: (row) => row.name,
  },
  {
    id: "status",
    header: "Status",
    sortable: true,
    sortValue: (row) => row.status,
    accessor: (row) => <Badge variant="secondary">{row.status}</Badge>,
  },
  {
    id: "role",
    header: "Role",
    sortable: true,
    sortValue: (row) => row.role,
    accessor: (row) => row.role,
  },
];

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 border-b py-10 last:border-b-0">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground max-w-2xl text-sm">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [checked, setChecked] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  return (
    <div className="container py-8 md:py-10">
      <PageHeader
        eyebrow="Design System"
        title="AZPPS Component Library"
        description="Production-hardened primitives, tokens, and patterns for a minimal premium enterprise SaaS experience. No calculator business logic."
        actions={
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 1200)),
                {
                  loading: "Saving preferences…",
                  success: "Preferences saved",
                  error: "Could not save preferences",
                },
              )
            }
          >
            Toast promise demo
          </Button>
        }
      />

      <Tabs defaultValue="components" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="mt-6 space-y-6">
          <Section
            title="Color tokens"
            description="Semantic palette tuned for AZPPS brand identity and WCAG contrast."
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "bg-primary text-primary-foreground",
                "bg-secondary text-secondary-foreground",
                "bg-accent text-accent-foreground",
                "bg-success text-success-foreground",
                "bg-warning text-warning-foreground",
                "bg-destructive text-destructive-foreground",
                "bg-info text-info-foreground",
                "bg-muted text-muted-foreground",
              ].map((classes) => (
                <div
                  key={classes}
                  className={`rounded-lg p-4 text-sm font-medium shadow-xs ${classes}`}
                >
                  {classes.split(" ")[0]?.replace("bg-", "")}
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="Typography"
            description="Fluid display hierarchy with readable body metrics."
          >
            <div className="space-y-3">
              <p className="text-display">Display</p>
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <h4>Heading 4</h4>
              <p className="text-body-lg">Body large supporting copy.</p>
              <p>Body default supporting copy for long-form readability.</p>
              <p className="text-body-sm">Body small supporting copy.</p>
              <p className="text-caption text-muted-foreground">
                CAPTION LABEL
              </p>
              <p className="text-label">Form label style</p>
              <code className="bg-muted rounded-md px-2 py-1 text-sm">
                const result = calculate()
              </code>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="components" className="mt-2">
          <Section
            title="Button"
            description="Consistent variants, sizes, hover, focus, and disabled states."
          >
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Section>

          <Section
            title="Search"
            description="Icon, clear action, loading state, and keyboard shortcut hint."
          >
            <div className="grid max-w-xl gap-3">
              <SearchBox
                value={searchValue}
                showShortcut
                loading={searchLoading}
                placeholder="Search calculators…"
                onChange={(event) => setSearchValue(event.target.value)}
                onClear={() => setSearchValue("")}
              />
              <Button
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() => {
                  setSearchLoading(true);
                  setTimeout(() => setSearchLoading(false), 900);
                }}
              >
                Simulate search loading
              </Button>
            </div>
          </Section>

          <Section
            title="Form controls"
            description="Input, textarea, select, checkbox, radio, and switch."
          >
            <div className="grid max-w-xl gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add details…" />
              </div>
              <Select defaultValue="personal">
                <SelectTrigger aria-label="Workspace">
                  <SelectValue placeholder="Select workspace" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  checked={checked}
                  onCheckedChange={(value) => setChecked(value === true)}
                />
                <Label htmlFor="terms">Accept terms</Label>
              </div>
              <Radio defaultValue="a" className="gap-3">
                <div className="flex items-center gap-2">
                  <RadioItem value="a" id="a" />
                  <Label htmlFor="a">Option A</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioItem value="b" id="b" />
                  <Label htmlFor="b">Option B</Label>
                </div>
              </Radio>
              <div className="flex items-center gap-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
            </div>
          </Section>

          <Section
            title="Data table"
            description="Client-side sorting, column visibility, pagination, loading, and empty states."
          >
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setTableLoading(true);
                    setTimeout(() => setTableLoading(false), 1000);
                  }}
                >
                  Simulate loading
                </Button>
              </div>
              <DataTable
                data={demoRows}
                columns={demoColumns}
                getRowId={(row) => row.id}
                loading={tableLoading}
                pageSize={3}
              />
            </div>
          </Section>

          <Section
            title="Card / Badge / Avatar"
            description="Content containers and status indicators."
          >
            <Card className="max-w-md shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Workspace</CardTitle>
                  <Badge>Pro</Badge>
                </div>
                <CardDescription>
                  Shared calculator environment.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>AZ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">AZPPS Team</p>
                  <p className="text-muted-foreground text-xs">8 members</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm">Open</Button>
              </CardFooter>
            </Card>
          </Section>

          <Section
            title="Overlays"
            description="Dialog, modal alias, sheet, drawer, tooltip, and popover."
          >
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm action</DialogTitle>
                    <DialogDescription>
                      Shared dialog primitive with focus trapping.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Modal>
                <ModalTrigger asChild>
                  <Button variant="outline">Modal</Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Modal alias</ModalTitle>
                    <ModalDescription>
                      Semantic alias of Dialog for product naming.
                    </ModalDescription>
                  </ModalHeader>
                  <ModalFooter>
                    <Button>Save</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet panel</SheetTitle>
                    <SheetDescription>Side panel pattern.</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Drawer</DrawerTitle>
                    <DrawerDescription>
                      Mobile-first bottom sheet.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>Helpful tooltip copy</TooltipContent>
              </Tooltip>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="text-sm">
                  Lightweight contextual content.
                </PopoverContent>
              </Popover>
            </div>
          </Section>

          <Section
            title="Alerts & toasts"
            description="Semantic alerts and toast helpers for product feedback."
          >
            <div className="grid gap-3">
              <Alert variant="success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Changes were saved successfully.
                </AlertDescription>
              </Alert>
              <Alert variant="error">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something failed. Please retry.
                </AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Review this setting before continuing.
                </AlertDescription>
              </Alert>
              <Alert variant="info">
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  New design tokens are available.
                </AlertDescription>
              </Alert>
              <Alert variant="announcement">
                <AlertTitle>Announcement</AlertTitle>
                <AlertDescription>
                  Design system hardening is complete for Sprint 2.
                </AlertDescription>
              </Alert>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => toast.success("Saved")}>
                  Success toast
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.error("Failed", "Please try again")}
                >
                  Error toast
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.warning("Check inputs")}
                >
                  Warning toast
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.loading("Working…")}
                >
                  Loading toast
                </Button>
              </div>
            </div>
          </Section>

          <Section
            title="Empty & error states"
            description="Reusable presets for common product voids."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <PresetEmptyState
                preset="no-data"
                action={<Button size="sm">Refresh</Button>}
              />
              <PresetEmptyState
                preset="no-calculators"
                action={<Button size="sm">Create calculator</Button>}
              />
              <PresetEmptyState preset="no-search-results" />
              <PresetEmptyState preset="no-categories" />
              <PresetEmptyState preset="no-activity" />
              <ErrorState onRetry={() => toast.message("Retry clicked")} />
            </div>
          </Section>

          <Section
            title="Loading states"
            description="Spinner, progress, skeletons, and specialized loaders."
          >
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <Spinner size="sm" />
                <Spinner />
                <Spinner size="lg" />
              </div>
              <Progress value={64} label="Upload progress" />
              <InlineProgress value={32} label="Indexing" />
              <div className="grid gap-4 lg:grid-cols-2">
                <CardLoader />
                <TableLoader rows={3} columns={3} />
              </div>
              <LoadingSkeleton variant="form" className="max-w-md" />
              <PageLoader className="min-h-[180px] rounded-xl border" />
            </div>
          </Section>

          <Section
            title="Navigation helpers"
            description="Breadcrumb, accordion, and tabs."
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Design System</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Accordion type="single" collapsible className="max-w-xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is AZPPS?</AccordionTrigger>
                <AccordionContent>
                  An AI-powered calculator platform foundation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          <Section
            title="Sidebar & charts"
            description="App shell navigation and chart foundation placeholders."
          >
            <SidebarProvider className="min-h-[280px] overflow-hidden rounded-xl border">
              <Sidebar collapsible="none" className="border-r">
                <SidebarHeader className="p-3">
                  <div className="flex items-center gap-2 px-2 text-sm font-semibold">
                    <Calculator className="size-4" aria-hidden="true" />
                    AZPPS
                  </div>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Library</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton isActive>
                            Overview
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>History</SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <SidebarInset className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <SidebarTrigger />
                  <p className="text-sm font-medium">Inset content</p>
                </div>
                <ChartPlaceholder
                  type="area"
                  title="Usage trend"
                  height={160}
                />
              </SidebarInset>
            </SidebarProvider>
            <ChartGrid className="mt-4" />
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
