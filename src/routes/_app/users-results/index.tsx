import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import { useState } from "react";
import type { TForm } from "../../../types/form";
import { FORM_DATA } from "../../../data/form";
import AppActionsDropdown from "../../../components/app-actions-dropdown";
import AppTable from "../../../components/app-table";
import { Plus, Rows3, SlidersHorizontal } from "lucide-react";
import { Button } from "../../../components/ui/button";
import SearchBar from "../../../components/ui/search-bar";
import IconSort from "../../../components/svg-icon/icon-sort";
import IconExport from "../../../components/svg-icon/icon-export";
import { Checkbox } from "../../../components/ui/checkbox";

export const Route = createFileRoute("/_app/users-results/")({
  component: RouteComponent,
});
// Dummy data
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
  console.log("🚀 ~ RouteComponent ~ form,:", form,)
  

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

    { header: "Name", accessorKey: "name" },
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
                  onClick: () => {
                    setForm({
                      type: "read",
                      title: "View User Result",
                      description: "",
                      id: data.id,
                    });
                  },
                },
              },
              {
                type: "update",
                name: "edit",
                icon: PenSquare,
                props: {
                  onClick: () => {
                    setForm({
                      type: "update",
                      title: "Update user result",
                      description: "",
                      id: data.id,
                    });
                  },
                },
              },
              {
                type: "delete",
                name: "delete",
                icon: Trash2,
                props: {
                  variant: "destructive",
                  onClick: () => {
                    setForm({
                      type: "delete",
                      title: "",
                      description: "",
                      id: data.id,
                    });
                  },
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
          <Button variant="gradient" className="">
            <Plus /> Add New User
          </Button>
        </div>
        <div className="flex justify-between">
          <SearchBar />
          <div className="flex gap-2">
            <Button variant="outline">
              <Rows3 />
              Columns
            </Button>
            <Button variant="outline">
              <Eye />
              View
            </Button>
            <Button variant="outline">
              <IconSort />
              Sort
            </Button>
            <Button variant="outline">
              <SlidersHorizontal />
              Filters
            </Button>
            <Button variant="outline">
              <IconExport />
              Export
            </Button>
          </div>
        </div>
      </div>
      <AppTable data={DUMMY_DATA} columns={columns} />
    </div>
  );
}
