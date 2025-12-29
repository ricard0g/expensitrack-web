import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface DashboardCardProps {
	label: string;
	Icon: LucideIcon;
	value: ReactNode;
	className?: string;
}

export function DashboardCard({
	label,
	Icon,
	value,
	className,
}: DashboardCardProps) {
	return (
		<div className={cn(
            "flex items-center justify-start col-span-1 lg:col-span-3 max-h-16 h-16 lg:max-h-20 lg:h-20 py-2 px-8 bg-linear-to-tr from-gray-100 to-accent-color-lightest rounded-md shadow-cool-subtle",
            className
        )}>
			<div className="flex items-center justify-center gap-x-4 w-full rounded-md">
				<div className="flex items-center justify-center gap-x-2">
					<Icon className="h-5 w-5 lg:h-7 lg:w-7" />
					<span className="text-sm lg:text-xl">{label}:</span>
				</div>
				<div className="py-1 px-3 lg:py-2 lg:px-4 bg-accent-color-ligher rounded-md shadow-cool-medium">
					<p className="text-lg lg:text-2xl text-white">
						{value}
					</p>
				</div>
			</div>
		</div>
	);
}
