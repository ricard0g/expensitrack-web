import type { Expense, ExpenseByCategory } from "@/types/expense";
import { Suspense, type Dispatch, type SetStateAction } from "react";
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
import { useState, useEffect, use } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { DashboardCard } from "./DashboardCard";
import { Spinner } from "../ui/spinner";

interface LoaderExpenses {
    userDataPromise: Promise<User>;
    allExpensesPromise: Promise<Expense[]>;
    expensesByCategoryPromise: Promise<ExpenseByCategory[]>;
    totalSpentPromise: Promise<number>;
}


function RemaininBudgetCard({ userDataPromise, totalSpentPromise }: { userDataPromise: Promise<User>, totalSpentPromise: Promise<number> }) {
    const user = use(userDataPromise);
    const remainingBudget = user.totalBudget - use(totalSpentPromise);

    return (
        <DashboardCard
            label="Remaining Budget"
            Icon={HandCoins}
            value={currencyFormatter(remainingBudget)}
        />
    )
}

function MonthlyBudgetCard({ userDataPromise }: { userDataPromise: Promise<User> }) {
    const user = use(userDataPromise);

    return (
        <DashboardCard
            label="Monthly Budget"
            Icon={PiggyBank}
            value={currencyFormatter(user.totalBudget)}
        />
    )
}

function LastExpenseCard({ allExpensesPromise }: { allExpensesPromise: Promise<Expense[]> }) {
    const allExpenses = use(allExpensesPromise);
    const { expenseName, expenseAmount } = allExpenses.reduce((latestExpense, currentExpense) => currentExpense.date > latestExpense.date ? currentExpense : latestExpense, allExpenses[0]);

    return (
        <DashboardCard
            label="Last Expense"
            Icon={History}
            value={
                <p className="flex items-center justify-center gap-x-2 lg:gap-x-4 text-sm lg:text-lg text-white">
                    <span>{expenseName}</span> →{" "}
                    <span>{currencyFormatter(expenseAmount)}</span>
                </p>
            }
            className="col-span-1 lg:col-span-4"
        />
    )
}

function BarChartCard({ expensesByCategoryPromise }: { expensesByCategoryPromise: Promise<ExpenseByCategory[]> }) {
    const expensesByCategory = use(expensesByCategoryPromise);

    return <CustomBarChart expensesByCategory={expensesByCategory} />
}

function RadarChartCard({ expensesByCategoryPromise }: { expensesByCategoryPromise: Promise<ExpenseByCategory[]> }) {
    const expensesByCategory = use(expensesByCategoryPromise);

    return <CustomRadarChart expensesByCategory={expensesByCategory} />
}

interface DataTableCardProps {
    allExpensesPromise: Promise<Expense[]>;
    setShowDeleteSuccess: Dispatch<SetStateAction<boolean>>;
    setShowDeleteError: Dispatch<SetStateAction<boolean>>;
    setDeleteMessage: Dispatch<SetStateAction<string>>;
    setDeleteErrorMessage: Dispatch<SetStateAction<string>>;
}

function DataTableCard({ allExpensesPromise, setShowDeleteSuccess, setShowDeleteError, setDeleteMessage, setDeleteErrorMessage }: DataTableCardProps) {
    const allExpenses = use(allExpensesPromise);

    return <DataTable
        columns={columns}
        data={allExpenses}
        setShowDeleteSuccess={setShowDeleteSuccess}
        setShowDeleteError={setShowDeleteError}
        setDeleteMessage={setDeleteMessage}
        setDeleteErrorMessage={setDeleteErrorMessage}
    />
}

export function Dashboard() {
    const [showDeleteSuccess, setShowDeleteSuccess] = useState<boolean>(false);
    const [showDeleteError, setShowDeleteError] = useState<boolean>(false);
    const [deleteMessage, setDeleteMessage] = useState<string>("");
    const [deleteErrorMessage, setDeleteErrorMessage] = useState<string>("");
    const { userDataPromise, allExpensesPromise, expensesByCategoryPromise, totalSpentPromise } =
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
            <Suspense fallback={
                <div className="flex items-center justify-start col-span-1 lg:col-span-3 min-h-20 max-h-16 h-16 lg:max-h-20 lg:h-20 py-2 px-8 bg-linear-to-tr from-gray-100 to-accent-color-lightest rounded-md shadow-cool-subtle">
                    <Spinner />
                </div>
            }>
                <MonthlyBudgetCard userDataPromise={userDataPromise} />
            </Suspense>
            <Suspense fallback={
                <div className="flex items-center justify-start col-span-1 lg:col-span-3 min-h-20 max-h-16 h-16 lg:max-h-20 lg:h-20 py-2 px-8 bg-linear-to-tr from-gray-100 to-accent-color-lightest rounded-md shadow-cool-subtle">
                    <Spinner />
                </div>
            }>
                <RemaininBudgetCard userDataPromise={userDataPromise} totalSpentPromise={totalSpentPromise} />
            </Suspense>
            <Suspense fallback={
                <div className="flex items-center justify-start col-span-1 lg:col-span-4 min-h-20 max-h-16 h-16 lg:max-h-20 lg:h-20 py-2 px-8 bg-linear-to-tr from-gray-100 to-accent-color-lightest rounded-md shadow-cool-subtle">
                    <Spinner />
                </div>
            }>
                <LastExpenseCard allExpensesPromise={allExpensesPromise} />
            </Suspense>
            <div className="col-span-1 lg:col-span-6 h-full bg-linear-to-br from-70% from-white  to-accent-color-lightest border border-gray-200 rounded-xl  shadow-cool-strong ">
                <Suspense fallback={
                    <div className="flex items-center justify-center min-h-[450px]">
                        <Spinner />
                    </div>
                }>
                    <BarChartCard expensesByCategoryPromise={expensesByCategoryPromise} />
                </Suspense>
            </div>
            <div className="col-span-1 lg:col-span-4 min-h-[500px] h-fit bg-linear-to-bl from-40% from-gray-100 to-accent-color-lightest border border-gray-200 rounded-xl p-3 shadow-cool-subtle ">
                <Suspense fallback={
                    <div className="flex items-center justify-center min-h-[450px]">
                        <Spinner />
                    </div>
                }>
                    <RadarChartCard expensesByCategoryPromise={expensesByCategoryPromise} />
                </Suspense>
            </div>
            <div className="col-span-1 lg:col-span-10 h-fit bg-zinc-200 border border-gray-200 rounded-xl p-8 shadow-cool-inner-strong overflow-hidden">
                <Suspense fallback={
                    <div className="flex items-center justify-center min-h-[400px]">
                        <Spinner />
                    </div>
                }>
                    <DataTableCard allExpensesPromise={allExpensesPromise} setShowDeleteSuccess={setShowDeleteSuccess} setShowDeleteError={setShowDeleteError} setDeleteMessage={setDeleteMessage} setDeleteErrorMessage={setDeleteErrorMessage} />
                </Suspense>
            </div>
        </section>
    );
}
