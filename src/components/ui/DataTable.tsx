import {
	type ColumnDef,
	useReactTable,
	getCoreRowModel,
	flexRender,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";
import { useEffect, type Dispatch, type SetStateAction } from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	showDeleteSuccess: boolean;
	showDeleteError: boolean;
	setShowDeleteSuccess: Dispatch<SetStateAction<boolean>>;
	setShowDeleteError: Dispatch<SetStateAction<boolean>>;
}

export function DataTable<TData, TValue>({
	columns,
	data,
    showDeleteSuccess,
    showError,
    setShowSuccess,
    setShowError
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
    
    useEffect(() => {

    })

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead
								className="text-center font-bold"
								key={header.id}
							>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							className="border-b border-b-zinc-400"
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell
									className={`py-3 text-center text-zinc-700 ${
										cell.column.id === "actions" &&
										"max-w-8 text-left"
									} ${
										cell.column.id === "id" && "max-w-14"
									} ${
										cell.column.id === "expenseAmount" &&
										"font-bold"
									} `}
									key={cell.id}
								>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={columns.length}
							className="h-24 text-center"
						>
							No Results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
