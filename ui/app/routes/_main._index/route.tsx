import type { MetaFunction } from "@remix-run/node"
import { Suspense } from "react"
import { Card } from "~/components/ui/card"
import { TimetableTable } from "./components/timetable-table"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Route() {
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h1>{"2024年度前期時間割"}</h1>
      <Suspense>
        <Card>
          <TimetableTable />
        </Card>
      </Suspense>
    </div>
  )
}
