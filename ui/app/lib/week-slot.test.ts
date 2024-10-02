import { expect, test } from "bun:test"
import { weekSlot } from "./week-slot"

// 月曜日を返す
test("月曜日を返す", () => {
  expect(weekSlot(0)).toBe("月")
})

// 火曜日を返す
test("火曜日を返す", () => {
  expect(weekSlot(1)).toBe("火")
})

// 水曜日を返す
test("水曜日を返す", () => {
  expect(weekSlot(2)).toBe("水")
})

// 木曜日を返す
test("木曜日を返す", () => {
  expect(weekSlot(3)).toBe("木")
})

// 金曜日を返す
test("金曜日を返す", () => {
  expect(weekSlot(4)).toBe("金")
})

// 土曜日を返す
test("土曜日を返す", () => {
  expect(weekSlot(5)).toBe("土")
})

// 日曜日を返す
test("日曜日を返す", () => {
  expect(weekSlot(6)).toBe("日")
})

// 無効なweekSlotを投げる
test("無効なweekSlotを投げる", () => {
  expect(() => weekSlot(7)).toThrow("Invalid weekSlot")
})
