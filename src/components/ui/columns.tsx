import type { Expense } from "@/types/expense"
import { currencyFormatter } from "@/utils/currencyFormatter";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

export const columns: ColumnDef<Expense>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
            <div>{row.original.id.slice(0, 8)}...</div>
        )
    },
    {
        accessorKey: "userFirstName",
        header: "User First Name"
    },
    {
        accessorKey: "categoryName",
        header: "Category"
    },
    {
        accessorKey: "expenseName",
        header: "Expense Title"
    },
    {
        accessorKey: "expenseAmount",
        header: () => <div className="font-bold">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("expenseAmount"));

            const formatted = currencyFormatter(amount);

            return (
                <div>{formatted}</div>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const expense = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 ml-auto">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(expense.id)}
                        >Copy expense ID</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }

    },
]
