"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, MoreHorizontal, Pencil, View } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import TodoSheet from "../sheets/TodoSheet"
import { useState } from "react"
import ActionsCell from "./ActionCell"

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "created_at",
        header: () => "Created",
        cell: ({ row }) => {
            const rawDate = row.getValue("created_at");
            const date = new Date(rawDate);
            const formatted = date.toLocaleDateString("hu-HU")

            return <div className="text-left">{formatted}</div>;
        }
    },
    {
        accessorKey: "deadline",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Due Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const rawDate = row.getValue("deadline");
            const date = new Date(rawDate);
            const formatted = date.toLocaleDateString("hu-HU")

            return <div className="text-left">{formatted}</div>;
        }
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionsCell row={row} />
    }
]