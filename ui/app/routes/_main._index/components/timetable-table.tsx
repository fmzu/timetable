import { useSuspenseQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { client } from "~/lib/client"

export function TimetableTable() {
  const data = useSuspenseQuery({
    queryKey: ["timetable"],
    async queryFn() {
      const resp = await client.api.my.enrollments.$get()

      const timetable = await resp.json()

      return timetable
    },
  })
  console.log("dataaaaaaaaaaa", data.data)

  const [weekSlot] = data.data.map((slot) => {
    return slot.program.weekSlot
  })
  console.log("weekSlot", weekSlot)

  const [timeSlot] = data.data.map((slot) => {
    return slot.program.timeSlot
  })

  /**
   * 数字の0と0を足して文字列の00を返す
   * @param weekSlot
   * @param timeSlot
   * @returns
   */
  const slot = (weekSlot: number, timeSlot: number) => {
    const sum = weekSlot.toString() + timeSlot.toString()
    return sum
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="border-r text-center">{""}</TableHead>
          <TableHead className="border-r text-center">{"月"}</TableHead>
          <TableHead className="border-r text-center">{"火"}</TableHead>
          <TableHead className="border-r text-center">{"水"}</TableHead>
          <TableHead className="border-r text-center">{"木"}</TableHead>
          <TableHead className="border-r text-center">{"金"}</TableHead>
          <TableHead className="border-r text-center">{"土"}</TableHead>
          <TableHead className="border-r text-center">{"日"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="border-r text-center">{"1"}</TableCell>
          <TableCell className="border-r text-center">{slot(0, 0)}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"2"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"3"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"4"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"5"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"6"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"7"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
