import { expect, test } from "bun:test"
import { timeSlot } from "./time-slot"

// 1を返す
test("1を返す", () => {
  expect(timeSlot(0)).toBe("1")
})

// 2を返す
test("2を返す", () => {
  expect(timeSlot(1)).toBe("2")
})

// 3を返す
test("3を返す", () => {
  expect(timeSlot(2)).toBe("3")
})

// 4を返す
test("4を返す", () => {
  expect(timeSlot(3)).toBe("4")
})

// 5を返す
test("5を返す", () => {
  expect(timeSlot(4)).toBe("5")
})

// 6を返す
test("6を返す", () => {
  expect(timeSlot(5)).toBe("6")
})

// 7を返す
test("7を返す", () => {
  expect(timeSlot(6)).toBe("7")
})

// 無効なtimeSlotを投げる
test("無効なtimeSlotを投げる", () => {
  expect(() => timeSlot(7)).toThrow("Invalid timeSlot")
})
