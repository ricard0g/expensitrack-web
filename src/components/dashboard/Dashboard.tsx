import type { Expense, ExpenseByCategory } from "@/types/expense"
import { useLoaderData } from "react-router"
import { CustomBarChart } from "../ui/CustomBarChart";


interface LoaderExpenses {
    allExpenses?: Expense[],
    expensesByCategory: ExpenseByCategory[]

}

export function Dashboard() {
    const { expensesByCategory } = useLoaderData<LoaderExpenses>();

    console.log(expensesByCategory)

    return (
        <section className="grid grid-cols-5 grid-rows-4 mt-4">
            <div className="col-span-3 border border-gray-200 rounded-xl p-3 shadow-cool-subtle">
                <CustomBarChart expensesByCategory={expensesByCategory} />
            </div>
        </section>
    )
}
