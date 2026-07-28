"use client";

import { useState } from "react";
import { Calculator, Info } from "lucide-react";
import { toast } from "sonner";

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
import { ChartPlaceholder } from "@/components/ui/chart-placeholder";
import { Checkbox } from "@/components/ui/checkbox";
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
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-3">
        <Badge variant="secondary">Design System</Badge>
        <h1 className="text-display">AZPPS Component Library</h1>
        <p className="text-body-lg text-muted-foreground max-w-3xl">
          Reusable, accessible, dark-mode-ready primitives and patterns for the
          AI-Powered Calculator Platform. No calculator business logic here —
          this page is the living catalog for Sprint 2.
        </p>
      </div>

      <Tabs defaultValue="components" className="w-full">
        <TabsList>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="mt-6 space-y-6">
          <Section
            title="Color tokens"
            description="Semantic colors mapped for light and dark themes with WCAG-minded contrast."
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
            description="Display through code roles with consistent size, weight, and tracking."
          >
            <div className="space-y-3">
              <p className="text-display">Display</p>
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <p className="text-body-lg">Body large supporting copy.</p>
              <p>Body default supporting copy.</p>
              <p className="text-body-sm">Body small supporting copy.</p>
              <p className="text-caption text-muted-foreground">
                CAPTION LABEL
              </p>
              <code className="bg-muted rounded px-2 py-1 text-sm">
                const result = calculate()
              </code>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="components" className="mt-2">
          <Section
            title="Button"
            description="Primary actions with variants and sizes. Supports asChild composition."
          >
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </Section>

          <Section
            title="Input / Textarea / Select / Search"
            description="Form controls with focus rings, labels, and responsive widths."
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
              <div className="space-y-2">
                <Label>Workspace</Label>
                <Select defaultValue="personal">
                  <SelectTrigger>
                    <SelectValue placeholder="Select workspace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <SearchBox placeholder="Search calculators…" />
            </div>
          </Section>

          <Section
            title="Checkbox / Radio / Switch"
            description="Accessible selection controls with keyboard support."
          >
            <div className="flex flex-col gap-4">
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
            title="Card / Badge / Avatar"
            description="Content containers and status/identity indicators."
          >
            <Card className="max-w-md">
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
            title="Dialog / Modal / Sheet / Drawer"
            description="Overlay surfaces for focused tasks on desktop and mobile."
          >
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm action</DialogTitle>
                    <DialogDescription>
                      This dialog uses the shared Dialog primitive.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Modal>
                <ModalTrigger asChild>
                  <Button variant="outline">Open Modal</Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Modal alias</ModalTitle>
                    <ModalDescription>
                      Modal re-exports Dialog for enterprise naming.
                    </ModalDescription>
                  </ModalHeader>
                  <ModalFooter>
                    <Button>Save</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet panel</SheetTitle>
                    <SheetDescription>
                      Side panel for settings and filters.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Drawer</DrawerTitle>
                    <DrawerDescription>
                      Bottom sheet pattern for mobile-first flows.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </Section>

          <Section
            title="Tabs / Accordion / Tooltip / Popover"
            description="Disclosure and contextual UI patterns."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <Tabs defaultValue="one">
                <TabsList>
                  <TabsTrigger value="one">One</TabsTrigger>
                  <TabsTrigger value="two">Two</TabsTrigger>
                </TabsList>
                <TabsContent value="one" className="text-sm">
                  First tab panel content.
                </TabsContent>
                <TabsContent value="two" className="text-sm">
                  Second tab panel content.
                </TabsContent>
              </Tabs>

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is AZPPS?</AccordionTrigger>
                  <AccordionContent>
                    An AI-powered calculator platform foundation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Info">
                    <Info className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Helpful tooltip copy</TooltipContent>
              </Tooltip>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open popover</Button>
                </PopoverTrigger>
                <PopoverContent className="text-sm">
                  Popover content for lightweight overlays.
                </PopoverContent>
              </Popover>
            </div>
          </Section>

          <Section
            title="Table / Breadcrumb / Pagination"
            description="Data display and navigation helpers."
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

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Alex</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sam</TableCell>
                  <TableCell>
                    <Badge variant="outline">Invited</Badge>
                  </TableCell>
                  <TableCell>Editor</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Section>

          <Section
            title="Alert / Toast / Empty / Error / Loading"
            description="Feedback and asynchronous state patterns."
          >
            <div className="grid gap-4">
              <Alert>
                <Info className="size-4" />
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>
                  Alerts communicate important inline status.
                </AlertDescription>
              </Alert>
              <Button
                variant="outline"
                onClick={() => toast.success("Toast ready for product flows")}
              >
                Show toast
              </Button>
              <EmptyState
                title="No calculators yet"
                description="Create your first calculator when product features land."
                action={<Button size="sm">Create</Button>}
              />
              <ErrorState onRetry={() => toast.message("Retry clicked")} />
              <LoadingSkeleton variant="card" />
            </div>
          </Section>

          <Section
            title="Sidebar / Charts placeholder"
            description="App shell navigation and future analytics surface."
          >
            <SidebarProvider className="min-h-[280px] rounded-xl border">
              <Sidebar collapsible="none" className="border-r">
                <SidebarHeader className="p-3">
                  <div className="flex items-center gap-2 px-2 text-sm font-semibold">
                    <Calculator className="size-4" />
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
                <ChartPlaceholder title="Usage trend" />
              </SidebarInset>
            </SidebarProvider>
          </Section>

          <Section
            title="Navbar / Footer"
            description="Global chrome components are active in the main layout above and below this page."
          >
            <p className="text-muted-foreground text-sm">
              <code>Navbar</code> and <code>Footer</code> render in{" "}
              <code>MainLayout</code>. Theme toggle, search, and links are
              included.
            </p>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
