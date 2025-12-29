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
	}, [showDeleteError, showDeleteSuccess, setShowDeleteSuccess, setShowDeleteError]);

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
			<div className="fixed top-5 left-1/2 -translate-x-1/2 col-span-10 z-50 w-full max-w-md">
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
			<div className="flex items-center justify-start col-span-1 lg:col-span-3 max-h-16 h-16 lg:max-h-20 lg:h-20 py-2 px-8 bg-linear-to-tr from-gray-100 to-accent-color-lightest rounded-md shadow-cool-subtle">
				<div className="flex items-center justify-center gap-x-4 w-full rounded-md">
					<div className="flex items-center justify-center gap-x-2">
						<PiggyBank className="h-5 w-5 lg:h-7 lg:w-7" />
						<span className="text-sm lg:text-xl">Monthly Budget:</span>
					</div>
					<div className="py-1 px-3 lg:py-2 lg:px-4 bg-accent-color-ligher rounded-md shadow-cool-medium">
						<p className="text-lg lg:text-2xl text-white">
							{currencyFormatter(userData.totalBudget)}
						</p>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-start col-span-1 lg:col-span-3 max-h-16 h-16 lg:max-h-20 lg:h-20 py-2 px-8 bg-linear-to-bl from-gray-100 to-accent-color-lightest rounded-md shadow-cool-subtle">
				<div className=" flex items-center justify-center gap-x-4 w-full rounded-md">
					<div className="flex items-center justify-center gap-x-2">
						<HandCoins className="h-5 w-5 lg:h-7 lg:w-7" />
						<span className="text-sm lg:text-xl">Remaining Budget:</span>
					</div>
					<div className="py-1 px-3 lg:py-2 lg:px-4 bg-accent-color-ligher rounded-md shadow-cool-medium">
						<p className="text-lg lg:text-2xl text-white">
							{currencyFormatter(remainingBudget)}
						</p>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-start col-span-1 lg:col-span-4 max-h-16 h-16 lg:max-h-20 lg:h-20 py-2 px-8 bg-linear-to-br from-gray-100 to-accent-color-lightest rounded-md shadow-cool-subtle">
				<div className="flex items-center justify-center gap-x-2 lg:gap-x-20 w-full">
					<div className="flex items-center justify-center gap-x-4">
						<History className="h-5 w-5 lg:h-7 lg:w-7" />
						<span className="text-sm lg:text-xl">Last Expense:</span>
					</div>
					<div className="py-1 px-3 lg:py-2 lg:px-4 bg-accent-color-ligher rounded-md shadow-cool-medium">
						<p className="flex items-center justify-center gap-x-2 lg:gap-x-4 text-sm lg:text-xl text-white">
							<span>{expenseName}</span> →{" "}
							<span>{currencyFormatter(expenseAmount)}</span>
						</p>
					</div>
				</div>
			</div>
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
