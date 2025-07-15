"use client"


import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import ActionsCell from "./ActionCell"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"
import DeadlineHeader from "./DeadlineHeader "
import SortableHeader from "./SortableHeader"

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
        header: < SortableHeader label="Title" field="title" />,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <span className="max-w-[150px] truncate block text-muted-foreground text-sm">
                {row.getValue("description")}
            </span>
        ),
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    // {
    //     accessorKey: "created_at",
    //     header: () => "Created",
    //     cell: ({ row }) => {
    //         const rawDate = row.getValue("created_at");
    //         const date = new Date(rawDate);
    //         const formatted = date.toLocaleDateString("hu-HU")

    //         return <div className="text-left">{formatted}</div>;
    //     }
    // },
    {
        accessorKey: "deadline",
        header: () => <SortableHeader label="Due Date" field="deadline" />,
        cell: ({ row }) => {
            const rawDate = row.getValue("deadline");
            const date = new Date(rawDate);
            const formatted = date.toLocaleDateString("hu-HU")

            return <div className="text-left">{formatted}</div>;
        }
        // header: ({ column }) => {
        //     return (
        //         <Button
        //             variant="ghost"
        //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //         >
        //             Due Date
        //             <ArrowUpDown className="ml-2 h-4 w-4" />
        //         </Button>
        //     )
        // },
        // cell: ({ row }) => {
        //     const rawDate = row.getValue("deadline");
        //     const date = new Date(rawDate);
        //     const formatted = date.toLocaleDateString("hu-HU")

        //     return <div className="text-left">{formatted}</div>;
        // }
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