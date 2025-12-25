import { currencyFormatter } from "@/utils/currencyFormatter";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import type { ExpenseByCategory } from "@/types/expense";


interface CustomBarChartProps {
    expensesByCategory: ExpenseByCategory[]
}

// XAxis -> Expense Name
// YAxis -> Amount
const chartConfig = {
    amount: {
        label: "Amount",
        color: "#ea9280"
    }
} satisfies ChartConfig

export function CustomBarChart({ expensesByCategory }: CustomBarChartProps) {

    const chartData = expensesByCategory.map((expense) => ({
        name: expense.categoryName,
        amount: expense.categoryTotalAmount,
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
