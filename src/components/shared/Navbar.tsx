import { CircleUserRound } from 'lucide-react'
import { Button } from '../ui/button'
import { CardHeader, CardTitle, Card, CardContent } from '../ui/card';
import { useLoaderData } from 'react-router'
import { useState } from 'react';

export function Navbar() {
    const [openCard, setOpenCard] = useState(false);
    const { userData } = useLoaderData();

    const { firstName, middleName, lastName } = userData;

    const handleClick = () => setOpenCard(!openCard);

    return (
        <header className='relative flex items-centery justify-center mx-auto '>
            <nav className='flex items-center justify-center w-full py-2 px-4 bg-gray-100 border-gray-200 border rounded-xl shadow-cool-subtle'>
                <ul className='flex items-center justify-between w-full'>
                    <li className='flex items-center justify-center gap-x-2'>
                        <Button
                            onClick={() => handleClick()}
                            variant="outline"
                            size="icon"
                            className='bg-transparent shadow-none border-transparent hover:border-accent-color hover:shadow-xs'
                        >
                            <CircleUserRound />
                        </Button>
                        <span className='hidden md:inline'>Hi {firstName}!</span>
                    </li>
                    <li>
                        <Button variant="default" className='bg-linear-to-br from-accent-color-ligher to-accent-color shadow-cool-subtle active:shadow-cool-inner-subtle hover:shadow-cool-strong'>
                            Add Expense
                        </Button>
                    </li>
                </ul>
            </nav>
            <Card className={`absolute block left-0 top-full mt-2 w-64 bg-gray-100 border-gray-200  ${openCard ? 'opacity-100 z-10' : 'opacity-0'} transition-opacity duration-200`}>
                <CardHeader>
                    <CardTitle className='mb-1.5 text-zinc-800'>Your Data:</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className='flex flex-col gap-y-0.5'>
                        <li>
                            <p className='text-zinc-600'>First Name: {firstName}</p>
                        </li>
                        <div>
                            <p className='text-zinc-600'>Middle Name: {middleName}</p>
                        </div>
                        <div>
                            <p className='text-zinc-600'>Last Name: {lastName}</p>
                        </div>
                    </ul>
                </CardContent>
            </Card>
        </header>
    )
}
