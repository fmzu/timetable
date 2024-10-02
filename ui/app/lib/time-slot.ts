export const timeSlot = (timeSlot: number) => {
  if (timeSlot === 0) {
    return "1"
  }

  if (timeSlot === 1) {
    return "2"
  }

  if (timeSlot === 2) {
    return "3"
  }

  if (timeSlot === 3) {
    return "4"
  }

  if (timeSlot === 4) {
    return "5"
  }

  if (timeSlot === 5) {
    return "6"
  }

  if (timeSlot === 6) {
    return "7"
  }

  throw new Error("Invalid timeSlot")
}
