import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  PenSquare,
  Trash2,
  Plus,
  Rows3,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import type { TForm } from "../../../types/form";
import { FORM_DATA } from "../../../data/form";
import AppActionsDropdown from "../../../components/app-actions-dropdown";
import AppTable from "../../../components/app-table";
import { Button } from "../../../components/ui/button";
import SearchBar from "../../../components/ui/search-bar";
import IconSort from "../../../components/svg-icon/icon-sort";
import IconExport from "../../../components/svg-icon/icon-export";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../../../components/ui/alert-dialog";
import FormUser from "./-components/form-user";

export const Route = createFileRoute("/_app/users-results/")({
  component: RouteComponent,
});

const DUMMY_DATA = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    deviceUsed: "Desktop",
    plan: "Premium",
    testsTaken: 15,
    lastTestDate: "2024-03-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    deviceUsed: "Mobile",
    plan: "Basic",
    testsTaken: 8,
    lastTestDate: "2024-03-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    deviceUsed: "Tablet",
    plan: "Premium",
    testsTaken: 22,
    lastTestDate: "2024-03-18",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    deviceUsed: "Desktop",
    plan: "Pro",
    testsTaken: 30,
    lastTestDate: "2024-03-20",
    status: "Active",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    deviceUsed: "Mobile",
    plan: "Basic",
    testsTaken: 5,
    lastTestDate: "2024-03-05",
    status: "Active",
  },
];

function RouteComponent() {
  const [form, setForm] = useState<TForm>(FORM_DATA);

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      accessorKey: "id",
      header: ({ table }) => (
        <div className="flex items-center gap-3">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
          <span className="font-medium">ID</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          <span>{row.original.id}</span>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    { header: "Email", accessorKey: "email" },
    { header: "Device Used", accessorKey: "deviceUsed" },
    { header: "Plan", accessorKey: "plan" },
    { header: "Tests Taken", accessorKey: "testsTaken" },
    { header: "Last Test Date", accessorKey: "lastTestDate" },
    { header: "Status", accessorKey: "status" },
    {
      header: "Actions",
      accessorKey: "action",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <AppActionsDropdown
            actions={[
              {
                type: "read",
                name: "view",
                icon: Eye,
                props: {
                  onClick: () =>
                    setForm({
                      type: "read",
                      title: "View User Result",
                      description: "",
                      id: data.id,
                    }),
                },
              },
              {
                type: "update",
                name: "edit",
                icon: PenSquare,
                props: {
                  onClick: () =>
                    setForm({
                      type: "update",
                      title: "Update User Result",
                      description: "",
                      id: data.id,
                    }),
                },
              },
              {
                type: "delete",
                name: "delete",
                icon: Trash2,
                props: {
                  variant: "destructive",
                  onClick: () =>
                    setForm({
                      type: "delete",
                      title: "",
                      description: "",
                      id: data.id,
                    }),
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-4 p-4">
      <div className="px-4">
        <div className="flex justify-between mb-6 mt-6">
          <h1 className="text-3xl font-bold leading-12">Users & Results</h1>
          <Button
            className="bg-gradient-to-r from-[#FF77D7] via-[#FF77D7] to-[#FA6C12] text-black hover:opacity-90"
            onClick={() =>
              setForm({
                type: "create",
                title: "Add New User",
                description: "",
              })
            }
          >
            <Plus /> Add New User
          </Button>
        </div>
        <div className="flex justify-between mb-4">
          <SearchBar />
          <div className="flex gap-2">
            <Button variant="outline">
              <Rows3 /> Columns
            </Button>
            <Button variant="outline">
              <Eye /> View
            </Button>
            <Button variant="outline">
              <IconSort /> Sort
            </Button>
            <Button variant="outline">
              <SlidersHorizontal /> Filters
            </Button>
            <Button variant="outline">
              <IconExport /> Export
            </Button>
          </div>
        </div>
      </div>

      <AppTable data={DUMMY_DATA} columns={columns} />

      {/* Read Dialog */}
      <Dialog
        open={form.type === "read"}
        onOpenChange={() => setForm(FORM_DATA)}
      >
        <DialogContent className="w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.title}</DialogTitle>
            <DialogDescription>{form.description}</DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-gray-100 rounded-md">
            <p>Viewing user data for ID: {form.id}</p>
            {/* Add CardUser component here if you have one */}
          </div>
        </DialogContent>
      </Dialog>

      {/* Create/Update Dialog */}
      <Dialog
        open={form.type === "create" || form.type === "update"}
        onOpenChange={() => setForm(FORM_DATA)}
      >
        <DialogContent className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.title}</DialogTitle>
            <DialogDescription>{form.description}</DialogDescription>
          </DialogHeader>
          <FormUser
            open={form.type === "create" || form.type === "update"}
            onClose={() => setForm(FORM_DATA)}
            formData={
              form.type === "update"
                ? DUMMY_DATA.find((user) => user.id === form.id)
                : undefined
            }
            onSuccess={() => {
              console.log("User saved successfully");
              setForm(FORM_DATA);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog
        open={form.type === "delete"}
        onOpenChange={() => setForm(FORM_DATA)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2">
            <AlertDialogCancel className="capitalize min-w-24">
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              className="capitalize min-w-24 flex items-center gap-2"
              onClick={() => {
                console.log("Deleting user:", form.id);
                setForm(FORM_DATA);
              }}
            >
              <Trash2 /> Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
