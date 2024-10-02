export const weekSlot = (weekSlot: number) => {
  if (weekSlot === 0) {
    return "月"
  }

  if (weekSlot === 1) {
    return "火"
  }

  if (weekSlot === 2) {
    return "水"
  }

  if (weekSlot === 3) {
    return "木"
  }

  if (weekSlot === 4) {
    return "金"
  }

  if (weekSlot === 5) {
    return "土"
  }

  if (weekSlot === 6) {
    return "日"
  }

  throw new Error("Invalid weekSlot")
}
