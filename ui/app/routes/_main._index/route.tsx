import type { MetaFunction } from "@remix-run/node"
import { TimetableTable } from "./components/timetable-table"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Route() {
  return (
    <div>
      <p>{"2024年度前期履修登録"}</p>
      <TimetableTable />
    </div>
  )
}
