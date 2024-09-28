import type { MetaFunction } from "@remix-run/node"
import { Suspense } from "react"
import { Card } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { LateTimetableTable } from "~/routes/_main._index/components/late-timetable-table"
import { EarlyTimetableTable } from "./components/early-timetable-table"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Route() {
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Tabs defaultValue="earlyPeriod">
        <TabsList>
          <TabsTrigger value={"earlyPeriod"}>{"前期"}</TabsTrigger>
          <TabsTrigger value={"latePeriod"}>{"後期"}</TabsTrigger>
        </TabsList>
        <TabsContent value={"earlyPeriod"}>
          <h1>{"2024年度前期時間割"}</h1>
          <Suspense>
            <Card>
              <EarlyTimetableTable />
            </Card>
          </Suspense>
        </TabsContent>
        <TabsContent value={"latePeriod"}>
          <h1>{"2024年度後期時間割"}</h1>
          <Suspense>
            <Card>
              <LateTimetableTable />
            </Card>
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
