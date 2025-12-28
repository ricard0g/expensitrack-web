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
        accessorKey: "date",
        header: "Date"
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
                    <DropdownMenuContent className="py-1.5 px-3 bg-zinc-800 rounded-md shadow-cool-subtle transition-all duration-200" align="end">
                        <DropdownMenuLabel className="py-1 text-zinc-200">Actions</DropdownMenuLabel>
                        <div className="h-px w-full border-t border-t-zinc-400"></div>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(expense.id)}
                            className="cursor-pointer text-zinc-300 hover:outline-0 hover:bg-zinc-600 py-1.5 px-3 my-1 rounded-md transition-all duration-200"
                        >Copy Expense ID</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(expense.id)}
                            className="cursor-pointer text-zinc-300 hover:outline-0 hover:bg-zinc-600 py-1.5 px-3 my-1 rounded-md transition-all duration-200"
                        >Delete Expense</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(expense.id)}
                            className="cursor-pointer text-zinc-300 hover:outline-0 hover:bg-zinc-600 py-1.5 px-3 my-1 rounded-md transition-all duration-200"
                        >Update Expense</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }

    },
]
