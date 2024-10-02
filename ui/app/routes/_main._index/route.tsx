import type { MetaFunction } from "@remix-run/node"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense } from "react"
import { Card } from "~/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { client } from "~/lib/client"
import { ProgramSlot } from "~/routes/_main._index/components/program-slot"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Route() {
  const data = useSuspenseQuery({
    queryKey: ["timetable"],
    async queryFn() {
      const resp = await client.api.my.enrollments.$get()
      const timetable = await resp.json()
      return timetable
    },
  })

  const slots = (weekSlot: number, timeSlot: number, period: number) => {
    const slots = data.data.filter((slot) => {
      return (
        slot.program.weekSlot === weekSlot && slot.program.timeSlot === timeSlot
      )
    })

    const slot = slots.find((slot) => slot.program.period === period)

    if (slot === undefined) {
      return []
    }

    return slots ? slots : []
  }

  const renderSlots = (weekSlot: number, timeSlot: number, period: number) => {
    const slotList = slots(weekSlot, timeSlot, period)
    const isMultipleSlots = slotList.length > 1

    return slotList.map((slot) => (
      <ProgramSlot
        id={slot.program.id}
        name={slot.program.name}
        key={slot.id}
        className={isMultipleSlots ? "text-red-500" : "text-black"}
      />
    ))
  }

  /**
   * booleanを返す関数
   * programの中のweekSlot, timeSlot, periodが重複した講義があるかどうかを判定する
   */
  const isDuplicate = () => {
    const slots = data.data
    const slotList = slots.map((slot) => {
      return {
        weekSlot: slot.program.weekSlot,
        timeSlot: slot.program.timeSlot,
        period: slot.program.period,
      }
    })

    const duplicateSlot = slotList.filter((slot, index) => {
      return (
        slotList.findIndex(
          (s) =>
            s.weekSlot === slot.weekSlot &&
            s.timeSlot === slot.timeSlot &&
            s.period === slot.period,
        ) !== index
      )
    })

    return duplicateSlot.length > 0
  }

  /**
   * 合計単位数を返す
   * periodごとにprogramのunitsCountを合計する
   */
  const earlyPeriodUnits = () => {
    const earlyPeriodUnits = data.data
      .filter((slot) => slot.program.period === 0)
      .reduce((acc, slot) => acc + slot.program.unitsCount, 0)

    return earlyPeriodUnits
  }

  const latePeriodUnits = () => {
    const latePeriodUnits = data.data
      .filter((slot) => slot.program.period === 1)
      .reduce((acc, slot) => acc + slot.program.unitsCount, 0)

    return latePeriodUnits
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Tabs defaultValue="earlyPeriod">
        <TabsList>
          <TabsTrigger value={"earlyPeriod"}>{"前期"}</TabsTrigger>
          <TabsTrigger value={"latePeriod"}>{"後期"}</TabsTrigger>
        </TabsList>
        <TabsContent value={"earlyPeriod"} className="space-y-4">
          <div>
            <h1>{"前期時間割"}</h1>
            <span className="flex gap-x-2">
              <span>{"合計単位数:"}</span>
              <span>{earlyPeriodUnits()}</span>
            </span>
            {isDuplicate() && (
              <p className="text-red-500">
                {"重複している講義があります。時間割を確認してください。"}
              </p>
            )}
          </div>
          <Suspense>
            <Card>
              <Table className="border-collapse">
                <TableHeader>
                  <TableRow className="grid grid-cols-8">
                    <TableHead className="border text-center items-center flex justify-center">
                      {""}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"月"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"火"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"水"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"木"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"金"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"土"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"日"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(7)].map((_, rowIndex) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <TableRow key={rowIndex} className="grid grid-cols-8">
                      <TableCell className="border text-center items-center flex justify-center">
                        {rowIndex + 1}
                      </TableCell>
                      {[...Array(7)].map((_, colIndex) => (
                        <TableCell
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          key={colIndex}
                          className="border text-center items-center flex justify-center p-2"
                        >
                          {renderSlots(rowIndex, colIndex, 0)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Suspense>
        </TabsContent>
        <TabsContent value={"latePeriod"} className="space-y-4">
          <div>
            <h1>{"後期時間割"}</h1>
            <span className="flex gap-x-2">
              <span>{"合計単位数:"}</span>
              <span>{latePeriodUnits()}</span>
            </span>
            {isDuplicate() && (
              <p className="text-red-500">
                {"重複している講義があります。時間割を確認してください。"}
              </p>
            )}
          </div>
          <Suspense>
            <Card>
              <Table className="border-collapse">
                <TableHeader>
                  <TableRow className="grid grid-cols-8">
                    <TableHead className="border text-center items-center flex justify-center">
                      {""}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"月"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"火"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"水"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"木"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"金"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"土"}
                    </TableHead>
                    <TableHead className="border text-center items-center flex justify-center">
                      {"日"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(7)].map((_, rowIndex) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <TableRow key={rowIndex} className="grid grid-cols-8">
                      <TableCell className="border text-center items-center flex justify-center">
                        {rowIndex + 1}
                      </TableCell>
                      {[...Array(7)].map((_, colIndex) => (
                        <TableCell
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          key={colIndex}
                          className="border text-center items-center flex justify-center p-2"
                        >
                          {renderSlots(rowIndex, colIndex, 1)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
