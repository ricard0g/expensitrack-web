export interface Expense {
    id: string,
    userId: string,
    userFirstName: string,
    categoryId: string,
    categoryName: string,
    expenseName: string,
    expenseDescription: string,
    expenseAmount: number,
    date: Date,
}

export interface ExpenseByCategory {
    categoryName: string,
    categoryTotalAmount: number
}
