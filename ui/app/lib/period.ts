export const period = (period: number) => {
  if (period === 0) {
    return "前期"
  }

  if (period === 1) {
    return "後期"
  }

  if (period === undefined) {
    return null
  }
}
