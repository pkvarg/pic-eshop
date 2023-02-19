export const withoutTax = (price) => {
  const tax = 20
  const taxDue = tax * (price / 100)
  return price - taxDue
}

export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}
