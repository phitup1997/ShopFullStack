export const generateSlug = (val: string) => {
  return val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-")
}

export const formatCurrency = (amount: number, symbol?: string): string => {
  const formattedAmount = new Intl.NumberFormat("en-US").format(amount)

  if (!symbol) {
    return formattedAmount
  }

  return `${formattedAmount} ${symbol}`
}
