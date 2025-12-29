import type { Expense, ExpenseByCategory } from "@/types/expense"
import { useLoaderData } from "react-router"
import { CustomBarChart } from "../ui/CustomBarChart";
import { CustomRadarChart } from "../ui/CustomRadarChart";
import { DataTable } from "../ui/DataTable";
import { columns } from "../ui/columns";
import { PiggyBank, HandCoins, History } from "lucide-react";
import type { User } from "@/types/user";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { useState } from "react";


interface LoaderExpenses {
    userData: User,
    allExpenses: Expense[],
    expensesByCategory: ExpenseByCategory[],
    totalSpent: number
}

export function Dashboard() {
    const [showDeleteSuccess, setShowDeleteSuccess] = useState<boolean>(false);
    const [showDeleteError, setShowDeleteError] = useState<boolean>(false);
    const { userData, allExpenses, expensesByCategory, totalSpent } = useLoaderData<LoaderExpenses>();

    // This calculation can and probably be done through the backend, but since it's a simple calculation we can do it here
    const remainingBudget = userData.totalBudget - totalSpent;

    const { expenseName, expenseAmount } = allExpenses.reduce((lastExpense, currentExpense) => currentExpense.date > lastExpense.date ? currentExpense : lastExpense, allExpenses[0]);

    return (
        <section className="grid grid-cols-[repeat(10, 1fr)] grid-rows-[--my-grid-rows] gap-x-5 gap-y-6 my-2 pt-2 pb-6">
            <div className="flex items-center justify-start col-span-3 max-h-20 h-20 py-2 px-8 bg-linear-to-tr from-gray-100 to-accent-color-lightest rounded-md shadow-cool-subtle">
                <div className="flex items-center justify-center gap-x-4 w-full rounded-md">
                    <div className="flex items-center justify-center gap-x-2">
                        <PiggyBank className="h-7 w-7" />
                        <span className="text-xl">Monthly Budget:</span>
                    </div>
                    <div className="py-2 px-4 bg-accent-color-ligher rounded-md shadow-cool-medium">
                        <p className="text-2xl text-white">{currencyFormatter(userData.totalBudget)}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-start col-span-3 max-h-20 h-20 py-2 px-8 bg-linear-to-bl from-gray-100 to-accent-color-lightest rounded-md shadow-cool-subtle">
                <div className=" flex items-center justify-center gap-x-4 w-full rounded-md">
                    <div className="flex items-center justify-center gap-x-2">
                        <HandCoins className="h-7 w-7"/>
                        <span className="text-xl">Remaining Budget:</span>
                    </div>
                    <div className="py-2 px-4 bg-accent-color-ligher rounded-md shadow-cool-medium">
                        <p className="text-2xl text-white">{currencyFormatter(remainingBudget)}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-start col-span-4 max-h-20 h-20 py-2 px-8 bg-linear-to-br from-gray-100 to-accent-color-lightest rounded-md shadow-cool-subtle">
                <div className="flex items-center justify-center gap-x-20 w-full">
                    <div className="flex items-center justify-center gap-x-4">
                        <History className="h-7 w-7" />
                        <span className="text-xl">Last Expense:</span>
                    </div>
                    <div className="py-2 px-4 bg-accent-color-ligher rounded-md shadow-cool-medium">
                        <p className="flex items-center justify-center gap-x-4 text-xl text-white"><span>{expenseName}</span> → <span>{currencyFormatter(expenseAmount)}</span></p>
                    </div>

                </div>
            </div>
            <div className="col-span-6 h-full bg-linear-to-br from-70% from-white  to-accent-color-lightest border border-gray-200 rounded-xl  shadow-cool-strong ">
                <CustomBarChart expensesByCategory={expensesByCategory} />
            </div>
            <div className="col-span-4 h-fit bg-linear-to-bl from-40% from-gray-100 to-accent-color-lightest border border-gray-200 rounded-xl p-3 shadow-cool-subtle ">
                <CustomRadarChart expensesByCategory={expensesByCategory} />
            </div>
            <div className="col-span-10 h-fit bg-zinc-200 border border-gray-200 rounded-xl p-8 shadow-cool-inner-strong overflow-hidden">
                <DataTable columns={columns} data={allExpenses} showDeleteSuccess={showDeleteSuccess} showDeleteError={showDeleteError} setShowDeleteSuccess={setShowDeleteSuccess}  />
            </div>
        </section>
    )
}
