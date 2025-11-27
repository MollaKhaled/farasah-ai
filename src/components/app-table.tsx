// @disable-react-compiler
"use client";
import { nanoid } from "nanoid";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface AppTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export default function AppTable<T>({ data, columns }: AppTableProps<T>) {
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
    <Table className="border">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="hover:bg-transparent">
            {headerGroup.headers.map((header) => (
              <TableHead
                className="h-11 text-start  text-muted-foreground border whitespace-nowrap"
                // key={header.id}
                key={nanoid()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id} className="hover:bg-transparent text-primary">
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={nanoid()}
                className="whitespace-nowrap border max-w-full truncate"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
