import type { Expense } from "@/types/expense";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import type { ColumnDef, Row, Table } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useFetcher } from "react-router";
import { useEffect } from "react";

interface ActionsCellProps {
    row: Row<Expense>;
    table: Table<Expense>;
}

const ActionsCell = ({ row, table }: ActionsCellProps) => {
    const expense = row.original;
    const fetcher = useFetcher<{
        success: boolean;
        message: string;
        error?: string;
    }>();

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher.data.success) {
                table.options.meta?.setDeleteMessage(fetcher.data.message);
                table.options.meta?.setShowDeleteSuccess(true);
            } else if (fetcher.data.error) {
                table.options.meta?.setDeleteErrorMessage(fetcher.data.error);
                table.options.meta?.setShowDeleteError(true);
            }
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 ml-auto">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4 p-0" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="py-1.5 px-3 bg-zinc-800 rounded-md shadow-cool-subtle transition-all duration-200"
                align="end"
            >
                <DropdownMenuLabel className="py-1 text-zinc-200">
                    Actions
                </DropdownMenuLabel>
                <div className="h-px w-full border-t border-t-zinc-400"></div>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(expense.id)}
                    className="cursor-pointer text-zinc-300 hover:outline-0 hover:text-zinc-900 py-1.5 px-3 my-1 rounded-md transition-all duration-200"
                >
                    Copy Expense ID
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-center cursor-pointer text-zinc-300 hover:outline-0 hover:bg-zinc-600 my-1 p-0 rounded-md transition-all duration-200">
                    <fetcher.Form method="DELETE">
                        <input
                            type="hidden"
                            name="intent"
                            value="deleteExpense"
                        />
                        <input
                            type="hidden"
                            name="expense-id"
                            value={expense.id}
                        />
                        <Button
                            type="submit"
                            disabled={fetcher.state !== "idle"}
                            className="text-zinc-300 p-0 m-0 bg-transparent hover:bg-transparent hover:text-zinc-900"
                        >
                            Delete Expense
                        </Button>
                    </fetcher.Form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const columns: ColumnDef<Expense>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <div>{row.original.id.slice(0, 5)}...</div>,
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "userFirstName",
        header: "User First Name",
    },
    {
        accessorKey: "categoryName",
        header: "Category",
    },
    {
        accessorKey: "expenseName",
        header: "Expense Title",
    },
    {
        accessorKey: "expenseAmount",
        header: () => <div className="font-bold">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("expenseAmount"));

            const formatted = currencyFormatter(amount);

            return <div>{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row, table }) => <ActionsCell row={row} table={table} />,
    },
];
