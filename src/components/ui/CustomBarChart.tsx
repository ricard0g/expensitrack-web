import { currencyFormatter } from "@/utils/currencyFormatter";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
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
        <Card className="border-0 px-0 shadow-none bg-transparent">
            <CardHeader>
                <CardTitle>Expenses Amount By Category</CardTitle>
            </CardHeader>

            <CardContent className="px-0 lg:px-4">
                <ChartContainer config={chartConfig} className="min-h-52 max-h-125 aspect-square w-full">
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

            </CardContent>
        </Card>
    )
}
