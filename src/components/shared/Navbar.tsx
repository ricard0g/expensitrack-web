import { CircleUserRound, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { CardHeader, CardTitle, Card, CardContent } from "../ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useLoaderData, useFetcher } from "react-router";
import { useState, useEffect, use, Suspense } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import type { User } from "@/types/user";
import type { ExpenseCategory } from "@/types/category";
// import { Spinner } from "../ui/spinner";

interface LoaderData {
    userData: User;
    categoriesPromise: Promise<ExpenseCategory[]>;
}

function SelectComponent({ categoriesPromise }: { categoriesPromise: Promise<ExpenseCategory[]> }) {
    const categories = use(categoriesPromise);

    return (
        <Select name="category-name">
            <SelectTrigger className="col-span-3 w-full">
                <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>
                        Categories
                    </SelectLabel>
                    {categories.map(
                        (category) => (
                            <SelectItem
                                key={
                                    category.id
                                }
                                value={
                                    category.categoryName
                                }
                            >
                                {
                                    category.categoryName
                                }
                            </SelectItem>
                        )
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export function Navbar() {
    const [openCard, setOpenCard] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const { userData, categoriesPromise } = useLoaderData() as LoaderData;
    const fetcher = useFetcher<{
        success?: boolean;
        message?: string;
        error?: string;
    }>();

    useEffect(() => {
        if (fetcher.state === 'idle' && fetcher.data) {
            if (fetcher.data.success) {
                setShowSuccess(true);
                setShowError(false);
                const timer = setTimeout(() => setShowSuccess(false), 8000);
                return () => clearTimeout(timer);
            }
        } else if (fetcher.data?.error) {
            setShowError(true);
            setShowSuccess(false);
            const timer = setTimeout(() => setShowError(false));
            return () => clearTimeout(timer);
        }
    }, [fetcher.state, fetcher.data]);

    const { firstName, middleName, lastName } = userData;

    const handleClick = () => setOpenCard(!openCard);

    return (
        <header className="relative flex items-centery justify-center mx-auto ">
            <nav className="flex items-center justify-center w-full py-2 px-4 bg-gray-100 border-gray-200 border rounded-xl shadow-cool-subtle">
                <ul className="flex items-center justify-between w-full">
                    <li className="flex items-center justify-center gap-x-2">
                        <Button
                            onClick={() => handleClick()}
                            variant="outline"
                            size="icon"
                            className="bg-transparent shadow-none border-transparent hover:border-accent-color hover:shadow-xs"
                        >
                            <CircleUserRound />
                        </Button>
                        <span className="hidden md:inline">
                            Hi {firstName}!
                        </span>
                    </li>
                    <li>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="default"
                                    className="bg-linear-to-br from-accent-color-ligher to-accent-color shadow-cool-subtle active:shadow-cool-inner-subtle hover:shadow-cool-strong"
                                >
                                    Add Expense
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] border-0 shadow-cool-medium">
                                <DialogHeader>
                                    <DialogTitle>Add Expense</DialogTitle>
                                    <DialogDescription>
                                        Create a new expense record here. Click
                                        save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                {showSuccess && (
                                    <Alert className="border-green-500/50 text-green-600 dark:text-green-500 [&>svg]:text-green-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <AlertTitle>Success</AlertTitle>
                                        <AlertDescription>
                                            {fetcher.data?.message}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {showError && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>
                                            {fetcher.data?.error}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <fetcher.Form
                                    method="POST"
                                    className="grid gap-4 py-4"
                                >
                                    <input
                                        type="hidden"
                                        name="intent"
                                        value="createExpense"
                                    />
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="expense-name"
                                            className="text-right"
                                        >
                                            Name
                                        </Label>
                                        <Input
                                            id="expense-name"
                                            name="expense-name"
                                            placeholder="Groceries"
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="category-name"
                                            className="text-right"
                                        >
                                            Category
                                        </Label>
                                        <Suspense fallback={
                                            <div className="col-span-3 h-10 w-full bg-gray-100">Loading Categories...</div>
                                        }>
                                            <SelectComponent categoriesPromise={categoriesPromise} />
                                        </Suspense>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="expense-amount"
                                            className="text-right"
                                        >
                                            Amount
                                        </Label>
                                        <Input
                                            id="expense-amount"
                                            name="expense-amount"
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            min="0"
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="date"
                                            className="text-right"
                                        >
                                            Date
                                        </Label>
                                        <Input
                                            id="date"
                                            name="date"
                                            type="date"
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="expense-description"
                                            className="text-right"
                                        >
                                            Description
                                        </Label>
                                        <Input
                                            id="expense-description"
                                            name="expense-description"
                                            placeholder="Weekly grocery run"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            disabled={fetcher.state !== "idle"}
                                            type="submit"
                                            className="bg-linear-to-br from-accent-color-ligher to-accent-color shadow-cool-subtle active:shadow-cool-inner-subtle"
                                        >
                                            {fetcher.state !== "idle"
                                                ? "Saving..."
                                                : "Create Expense"}
                                        </Button>
                                    </DialogFooter>
                                </fetcher.Form>
                            </DialogContent>
                        </Dialog>
                    </li>
                </ul>
            </nav>
            <Card
                className={`absolute block left-0 top-full mt-2 w-64 bg-gray-100 border-gray-200  ${openCard ? "opacity-100 z-10" : "opacity-0"
                    } transition-opacity duration-200`}
            >
                <CardHeader>
                    <CardTitle className="mb-1.5 text-zinc-800">
                        Your Data:
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="flex flex-col gap-y-0.5">
                        <li>
                            <p className="text-zinc-600">
                                First Name: {firstName}
                            </p>
                        </li>
                        <div>
                            <p className="text-zinc-600">
                                Middle Name: {middleName}
                            </p>
                        </div>
                        <div>
                            <p className="text-zinc-600">
                                Last Name: {lastName}
                            </p>
                        </div>
                    </ul>
                </CardContent>
            </Card>
        </header>
    );
}
