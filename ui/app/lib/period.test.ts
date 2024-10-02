import { expect, test } from "bun:test"
import { period } from "./period"

test("前期を返す", () => {
  expect(period(0)).toBe("前期")
})

test("後期を返す", () => {
  expect(period(1)).toBe("後期")
})

test("無効な期間を投げる", () => {
  expect(() => period(2)).toThrow("Invalid period")
})
