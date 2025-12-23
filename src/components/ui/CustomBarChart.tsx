import type { Expense } from "@/types/expense";
import type { ChartConfig } from "./chart";

interface CustomBarChartProps {
    allExpenses: Expense[]
}

interface ChartData {
    expenseName: String,
    expenseAmount: Number,
    categoryName: String,
    date: Date,
}

const chartConfig = {
    desktop: {}
} satisfies ChartConfig

export function CustomBarChart({ allExpenses }: CustomBarChartProps) {


    return ()
}
