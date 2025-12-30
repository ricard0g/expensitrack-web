import {
	type ColumnDef,
	useReactTable,
	getCoreRowModel,
	flexRender,
    type RowData,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";
import { type Dispatch, type SetStateAction } from "react";

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    setShowDeleteSuccess: Dispatch<SetStateAction<boolean>>;
    setShowDeleteError: Dispatch<SetStateAction<boolean>>;
    setDeleteMessage: Dispatch<SetStateAction<string>>;
    setDeleteErrorMessage: Dispatch<SetStateAction<string>>;
  }
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	setShowDeleteSuccess: Dispatch<SetStateAction<boolean>>;
	setShowDeleteError: Dispatch<SetStateAction<boolean>>;
    setDeleteMessage: Dispatch<SetStateAction<string>>;
    setDeleteErrorMessage: Dispatch<SetStateAction<string>>;
}

export function DataTable<TData, TValue>({
	columns,
	data,
    setShowDeleteSuccess,
    setShowDeleteError,
    setDeleteMessage,
    setDeleteErrorMessage
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
        meta: { // the meta option of the tanstack-table is arbitrary context we pass to our table that can be accessed anywhere in our table. We can access this data through passing the 'table' parameter to add the 'table' context and going to 'table.options.meta.*' there we'll find this data we're passing here
            setShowDeleteSuccess,
            setShowDeleteError,
            setDeleteMessage,
            setDeleteErrorMessage
        }
	});
    
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
										"max-w-16 lg:max-w-8 text-left"
									} ${
										cell.column.id === "id" && "max-w-20 w-20 lg:max-w-14"
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
