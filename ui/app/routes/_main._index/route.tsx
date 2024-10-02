import type { MetaFunction } from "@remix-run/node"
import { Suspense } from "react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
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
      <Tabs defaultValue="earlyPeriod">
        <TabsList>
          <TabsTrigger value={"earlyPeriod"}>{"前期"}</TabsTrigger>
          <TabsTrigger value={"latePeriod"}>{"後期"}</TabsTrigger>
        </TabsList>
        <TabsContent value={"earlyPeriod"} className="space-y-4">
          <h1>{"前期時間割"}</h1>
          <Suspense>
            <Card>
              <TimetableTable period={0} />
            </Card>
          </Suspense>
          <Button className="flex-1 w-full">{"決定"}</Button>
        </TabsContent>
        <TabsContent value={"latePeriod"} className="space-y-4">
          <h1>{"後期時間割"}</h1>
          <Suspense>
            <Card>
              <TimetableTable period={1} />
            </Card>
          </Suspense>
          <Button className="flex-1 w-full">{"決定"}</Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
