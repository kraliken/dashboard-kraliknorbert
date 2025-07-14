"use client"

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState } from "react"
import EditTodoSheet from "../sheets/EditTodoSheet"
import EditTodoForm from "../forms/EditTodoForm"
import DeleteTodoAlertDialog from "./DeleteTodoAlertDialog"
import TodoViewDialog from "../todo/TodoViewDialog"

const ActionsCell = ({ row }) => {

    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTodoViewOpen, setIsTodoViewOpen] = useState(false);

    const handleEditClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false); // Dropdown bezárása
        setIsEditSheetOpen(true);
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false); // Dropdown bezárása
        setIsAlertDialogOpen(true);
    };
    const handleViewClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false); // Dropdown bezárása
        setIsTodoViewOpen(true);
    };

    return (
        <div className="flex items-center gap-2">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" align="center">
                    <DropdownMenuItem onClick={handleViewClick}>
                        <Eye />
                        View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEditClick}>
                        <Pencil />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteClick}>
                        <Trash2 />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteTodoAlertDialog
                todo={row.original}
                isOpen={isAlertDialogOpen}
                onOpenChange={setIsAlertDialogOpen}
            />

            <TodoViewDialog
                todo={row.original}
                isOpen={isTodoViewOpen}
                onOpenChange={setIsTodoViewOpen}
            />

            <EditTodoSheet
                title="Edit Todo"
                triggerLabel="Edit"
                isOpen={isEditSheetOpen}
                onOpenChange={setIsEditSheetOpen}
            >
                <EditTodoForm todo={row.original} />
            </EditTodoSheet>
        </div>
    );
};

export default ActionsCell