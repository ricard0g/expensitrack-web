import type { Expense, ExpenseByCategory } from "@/types/expense"
import { useLoaderData } from "react-router"
import { CustomBarChart } from "../ui/CustomBarChart";
import { CustomRadarChart } from "../ui/CustomRadarChart";
import { DataTable } from "../ui/DataTable";
import { columns } from "../ui/columns";


interface LoaderExpenses {
    allExpenses: Expense[],
    expensesByCategory: ExpenseByCategory[]

}

export function Dashboard() {
    const { allExpenses, expensesByCategory } = useLoaderData<LoaderExpenses>();

    console.log(expensesByCategory)

    return (
        <section className="grid grid-cols-5 grid-rows-2 gap-x-4 gap-y-4 my-2 pt-2 pb-6">
            <div className="col-span-3 bg-linear-to-br from-70% from-white  to-accent-color-lightest border border-gray-200 rounded-xl p-3 shadow-cool-strong ">
                <CustomBarChart expensesByCategory={expensesByCategory} />
            </div>
            <div className="col-span-2 bg-linear-to-bl from-40% from-gray-50 to-accent-color-lightest border border-gray-200 rounded-xl p-3 shadow-cool-subtle ">
                <CustomRadarChart expensesByCategory={expensesByCategory} />
            </div>
            <div className=" col-span-5 bg-linear-to-tl from-50% from-white  to-accent-color-lightest border border-gray-200 rounded-xl p-8 shadow-cool-inner overflow-hidden">
                <DataTable columns={columns} data={allExpenses} />
            </div>
        </section>
    )
}
