import { useLoaderData } from "react-router"

export function Dashboard() {
    const { allExpenses } = useLoaderData();

    console.log(allExpenses);

    return (
        <section className="grid grid-cols-5 grid-rows-4">
            <div className="col-span-3">

            </div>
        </section>
    )
}
