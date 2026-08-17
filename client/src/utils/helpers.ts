export const generateSlug = (val: string) => {
  return val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-")
}

export const formatCurrency = (
  amount: number | string,
  symbol?: string,
): string => {
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount

  if (isNaN(numericAmount)) {
    return `0${symbol ? ` ${symbol}` : ""}`
  }

  const formattedAmount = new Intl.NumberFormat("en-US").format(numericAmount)

  if (!symbol) {
    return formattedAmount
  }

  return `${formattedAmount} ${symbol}`
}
