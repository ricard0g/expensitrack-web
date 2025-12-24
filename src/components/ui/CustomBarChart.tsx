import { currencyFormatter } from "@/utils/currencyFormatter";
import type { Expense } from "@/types/expense";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

interface CustomBarChartProps {
    expenses: Expense[]
}

// XAxis -> Expense Name
// YAxis -> Amount
const chartConfig = {
    amount: {
        label: "Amount",
        color: "#ea9280"
    }
} satisfies ChartConfig

export function CustomBarChart({ expenses }: CustomBarChartProps) {

    const chartData = expenses.map((expense) => ({
        name: expense.expenseName,
        amount: expense.expenseAmount,
        date: expense.date,
        fill: "#ea9280"
    }));

    return (
        <ChartContainer config={chartConfig} className="min-h-50 w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="name"
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.length > 10 ? value.slice(0, 5) : value}
                />
                <YAxis
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    dataKey="amount"
                />
                <ChartTooltip formatter={(value) => typeof value === 'number' && currencyFormatter(value)} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="amount" fill="var(--color-month)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
