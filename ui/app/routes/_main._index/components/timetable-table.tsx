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
  /**
   * 個人向けのデータはuseSuspenseQueryで取得するのが向いている
   */
  const data = useSuspenseQuery({
    queryKey: ["timetable"],
    async queryFn() {
      const resp = await client.api.my.enrollments.$get()

      const timetable = await resp.json()

      return timetable
    },
  })

  const weekSlot = data.data.map((slot) => {
    return slot.program.weekSlot
  })

  const timeSlot = data.data.map((slot) => {
    return slot.program.timeSlot
  })

  /**
   * 数字の0と0を足して文字列の00を返す
   * @param weekSlot
   * @param timeSlot
   * @returns
   */
  const slot = (weekSlot: number, timeSlot: number) => {
    const slot = data.data.find((slot) => {
      return (
        slot.program.weekSlot === weekSlot && slot.program.timeSlot === timeSlot
      )
    })

    return slot ? slot.program.name : null
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
          <TableCell className="border-r text-center">{slot(0, 1)}</TableCell>
          <TableCell className="border-r text-center">{slot(0, 2)}</TableCell>
          <TableCell className="border-r text-center">{slot(0, 3)}</TableCell>
          <TableCell className="border-r text-center">{slot(0, 4)}</TableCell>
          <TableCell className="border-r text-center">{slot(0, 5)}</TableCell>
          <TableCell className="border-r text-center">{slot(0, 6)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"2"}</TableCell>
          <TableCell className="border-r text-center">{slot(1, 0)}</TableCell>
          <TableCell className="border-r text-center">{slot(1, 1)}</TableCell>
          <TableCell className="border-r text-center">{slot(1, 2)}</TableCell>
          <TableCell className="border-r text-center">{slot(1, 3)}</TableCell>
          <TableCell className="border-r text-center">{slot(1, 4)}</TableCell>
          <TableCell className="border-r text-center">{slot(1, 5)}</TableCell>
          <TableCell className="border-r text-center">{slot(1, 6)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"3"}</TableCell>
          <TableCell className="border-r text-center">{slot(2, 0)}</TableCell>
          <TableCell className="border-r text-center">{slot(2, 1)}</TableCell>
          <TableCell className="border-r text-center">{slot(2, 2)}</TableCell>
          <TableCell className="border-r text-center">{slot(2, 3)}</TableCell>
          <TableCell className="border-r text-center">{slot(2, 4)}</TableCell>
          <TableCell className="border-r text-center">{slot(2, 5)}</TableCell>
          <TableCell className="border-r text-center">{slot(2, 6)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"4"}</TableCell>
          <TableCell className="border-r text-center">{slot(3, 0)}</TableCell>
          <TableCell className="border-r text-center">{slot(3, 1)}</TableCell>
          <TableCell className="border-r text-center">{slot(3, 2)}</TableCell>
          <TableCell className="border-r text-center">{slot(3, 3)}</TableCell>
          <TableCell className="border-r text-center">{slot(3, 4)}</TableCell>
          <TableCell className="border-r text-center">{slot(3, 5)}</TableCell>
          <TableCell className="border-r text-center">{slot(3, 6)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"5"}</TableCell>
          <TableCell className="border-r text-center">{slot(4, 0)}</TableCell>
          <TableCell className="border-r text-center">{slot(4, 1)}</TableCell>
          <TableCell className="border-r text-center">{slot(4, 2)}</TableCell>
          <TableCell className="border-r text-center">{slot(4, 3)}</TableCell>
          <TableCell className="border-r text-center">{slot(4, 4)}</TableCell>
          <TableCell className="border-r text-center">{slot(4, 5)}</TableCell>
          <TableCell className="border-r text-center">{slot(4, 6)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"6"}</TableCell>
          <TableCell className="border-r text-center">{slot(5, 0)}</TableCell>
          <TableCell className="border-r text-center">{slot(5, 1)}</TableCell>
          <TableCell className="border-r text-center">{slot(5, 2)}</TableCell>
          <TableCell className="border-r text-center">{slot(5, 3)}</TableCell>
          <TableCell className="border-r text-center">{slot(5, 4)}</TableCell>
          <TableCell className="border-r text-center">{slot(5, 5)}</TableCell>
          <TableCell className="border-r text-center">{slot(5, 6)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"7"}</TableCell>
          <TableCell className="border-r text-center">{slot(6, 0)}</TableCell>
          <TableCell className="border-r text-center">{slot(6, 1)}</TableCell>
          <TableCell className="border-r text-center">{slot(6, 2)}</TableCell>
          <TableCell className="border-r text-center">{slot(6, 3)}</TableCell>
          <TableCell className="border-r text-center">{slot(6, 4)}</TableCell>
          <TableCell className="border-r text-center">{slot(6, 5)}</TableCell>
          <TableCell className="border-r text-center">{slot(6, 6)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
