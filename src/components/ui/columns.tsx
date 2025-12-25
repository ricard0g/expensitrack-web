import type { Expense } from "@/types/expense"
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Expense>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "userFirstName",
        header: "Owner First Name"
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
        header: "Amount"
    },
]
