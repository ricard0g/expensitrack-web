import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card, CardTitle, CardHeader, CardContent } from "./card";
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import type { ExpenseByCategory } from "@/types/expense";
import { currencyFormatter } from "@/utils/currencyFormatter";

interface CustomRadarChartProps {
    expensesByCategory: ExpenseByCategory[]
}

const chartConfig = {
    amount: {
        label: "Amount",
        color: "#ea9280"
    }
} satisfies ChartConfig

export function CustomRadarChart({ expensesByCategory }: CustomRadarChartProps) {

    const chartData = expensesByCategory.map((expense) => ({
        name: expense.categoryName,
        amount: expense.categoryTotalAmount,
        fill: "#ea9280"
    }))

    return (
        <Card className="border-0 shadow-none bg-transparent w-full">
            <CardHeader>
                <CardTitle>Area of Expenses per category</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-52 max-h-125 aspect-square w-full">
                    <RadarChart accessibilityLayer data={chartData}>
                        <ChartLegend content={<ChartLegendContent />} />
                        <ChartTooltip formatter={(value) => typeof value == 'number' && currencyFormatter(value)} content={<ChartTooltipContent />} />
                        <PolarAngleAxis
                            dataKey="name"
                        />
                        <PolarGrid />
                        <Radar dataKey="amount" fill="#ea9280" fillOpacity={0.6} />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
