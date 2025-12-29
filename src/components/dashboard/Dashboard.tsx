import type { Expense, ExpenseByCategory } from "@/types/expense";
import { useLoaderData } from "react-router";
import { CustomBarChart } from "../ui/CustomBarChart";
import { CustomRadarChart } from "../ui/CustomRadarChart";
import { DataTable } from "../ui/DataTable";
import { columns } from "../ui/columns";
import {
	PiggyBank,
	HandCoins,
	History,
	CheckCircle2,
	AlertCircle,
} from "lucide-react";
import type { User } from "@/types/user";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { DashboardCard } from "./DashboardCard";

interface LoaderExpenses {
	userData: User;
	allExpenses: Expense[];
	expensesByCategory: ExpenseByCategory[];
	totalSpent: number;
}

export function Dashboard() {
	const [showDeleteSuccess, setShowDeleteSuccess] = useState<boolean>(false);
	const [showDeleteError, setShowDeleteError] = useState<boolean>(false);
	const [deleteMessage, setDeleteMessage] = useState<string>("");
	const [deleteErrorMessage, setDeleteErrorMessage] = useState<string>("");
	const { userData, allExpenses, expensesByCategory, totalSpent } =
		useLoaderData<LoaderExpenses>();

	useEffect(() => {
		if (showDeleteSuccess) {
			const timer = setTimeout(() => setShowDeleteSuccess(false), 8000);
			return () => clearTimeout(timer);
		} else if (showDeleteError) {
			const timer = setTimeout(() => setShowDeleteError(false), 8000);
			return () => clearTimeout(timer);
		}
	}, [
		showDeleteError,
		showDeleteSuccess,
		setShowDeleteSuccess,
		setShowDeleteError,
	]);

	// This calculation can and probably be done through the backend, but since it's a simple calculation we can do it here
	const remainingBudget = userData.totalBudget - totalSpent;

	const { expenseName, expenseAmount } = allExpenses.reduce(
		(lastExpense, currentExpense) =>
			currentExpense.date > lastExpense.date
				? currentExpense
				: lastExpense,
		allExpenses[0]
	);

	return (
		<section className="grid grid-cols-1 lg:grid-cols-[repeat(10,1fr)] lg:grid-rows-[--my-grid-rows] gap-y-6 lg:gap-x-5 my-2 pt-2 pb-6">
			<div className="fixed top-5 left-1/2 -translate-x-1/2 col-span-10 z-50 w-10/12 lg:w-full max-w-md">
				{showDeleteSuccess && (
					<Alert className="border-green-500/50 text-green-600 dark:text-green-500 [&>svg]:text-green-600 mb-4 bg-white shadow-lg">
						<CheckCircle2 className="h-4 w-4" />
						<AlertTitle>Success</AlertTitle>
						<AlertDescription>{deleteMessage}</AlertDescription>
					</Alert>
				)}
				{showDeleteError && (
					<Alert
						variant="destructive"
						className="mb-4 bg-white shadow-lg"
					>
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>
							{deleteErrorMessage}
						</AlertDescription>
					</Alert>
				)}
			</div>
			<DashboardCard
				label="Monthly Budget"
				Icon={PiggyBank}
				value={currencyFormatter(userData.totalBudget)}
			/>
			<DashboardCard
				label="Remaining Budget"
				Icon={HandCoins}
				value={currencyFormatter(remainingBudget)}
			/>
			<DashboardCard
				label="Last Expense"
				Icon={History}
				value={
					<p className="flex items-center justify-center gap-x-2 lg:gap-x-4 text-sm lg:text-xl text-white">
						<span>{expenseName}</span> →{" "}
						<span>{currencyFormatter(expenseAmount)}</span>
					</p>
				}
                className="col-span-1 lg:col-span-4"
			/>
			<div className="col-span-1 lg:col-span-6 h-full bg-linear-to-br from-70% from-white  to-accent-color-lightest border border-gray-200 rounded-xl  shadow-cool-strong ">
				<CustomBarChart expensesByCategory={expensesByCategory} />
			</div>
			<div className="col-span-1 lg:col-span-4 h-fit bg-linear-to-bl from-40% from-gray-100 to-accent-color-lightest border border-gray-200 rounded-xl p-3 shadow-cool-subtle ">
				<CustomRadarChart expensesByCategory={expensesByCategory} />
			</div>
			<div className="col-span-1 lg:col-span-10 h-fit bg-zinc-200 border border-gray-200 rounded-xl p-8 shadow-cool-inner-strong overflow-hidden">
				<DataTable
					columns={columns}
					data={allExpenses}
					setShowDeleteSuccess={setShowDeleteSuccess}
					setShowDeleteError={setShowDeleteError}
					setDeleteMessage={setDeleteMessage}
					setDeleteErrorMessage={setDeleteErrorMessage}
				/>
			</div>
		</section>
	);
}
