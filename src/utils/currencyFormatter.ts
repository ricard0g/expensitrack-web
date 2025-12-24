const currencyFormatter = (amount: number): string => {
    const formatter = new Intl.NumberFormat('es-ES', {
        style: "currency",
        currency: "EUR"
    })

    return formatter.format(amount);
}

export { currencyFormatter }
