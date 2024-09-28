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
import { ProgramSlot } from "~/routes/_main._index/components/program-slot"

export function LateTimetableTable() {
  /**
   * 個人向けのデータはuseSuspenseQueryで取得するのが向いている
   * useSuspenseQueryは取得の時につかうもので、useMutationは更新、削除（変化する）の時に使う
   */
  const data = useSuspenseQuery({
    /**
     * キャッシュするためのキー
     * ページごとに変える
     */
    queryKey: ["timetable"],
    async queryFn() {
      const resp = await client.api.my.enrollments.$get()

      const timetable = await resp.json()

      return timetable
    },
  })

  /**
   * 数字から枠を指定して講義名を取得する
   * @param weekSlot
   * @param timeSlot
   * @returns
   */
  const slots = (weekSlot: number, timeSlot: number) => {
    const slots = data.data.filter((slot) => {
      return (
        slot.program.weekSlot === weekSlot && slot.program.timeSlot === timeSlot
      )
    })

    const slot = slots.find((slot) => slot.program.period === 1)

    if (slot === undefined) {
      return []
    }

    return slots ? slots : []
  }

  return (
    <Table className="border-collapse">
      <TableHeader>
        <TableRow className="grid grid-cols-8">
          <TableHead className="border text-center">{""}</TableHead>
          <TableHead className="border text-center">{"月"}</TableHead>
          <TableHead className="border text-center">{"火"}</TableHead>
          <TableHead className="border text-center">{"水"}</TableHead>
          <TableHead className="border text-center">{"木"}</TableHead>
          <TableHead className="border text-center">{"金"}</TableHead>
          <TableHead className="border text-center">{"土"}</TableHead>
          <TableHead className="border text-center">{"日"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="grid grid-cols-8">
          <TableCell className="border text-center">{"1"}</TableCell>
          <TableCell className="border text-center">
            {slots(0, 0).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(0, 1).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(0, 2).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(0, 3).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>

          <TableCell className="border text-center">
            {slots(0, 4).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(0, 5).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(0, 6).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
        </TableRow>
        <TableRow className="grid grid-cols-8">
          <TableCell className="border text-center">{"2"}</TableCell>
          <TableCell className="border text-center">
            {slots(1, 0).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(1, 1).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(1, 2).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(1, 3).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>

          <TableCell className="border text-center">
            {slots(1, 4).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(1, 5).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(1, 6).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
        </TableRow>
        <TableRow className="grid grid-cols-8">
          <TableCell className="border text-center">{"3"}</TableCell>
          <TableCell className="border text-center">
            {slots(2, 0).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(2, 1).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(2, 2).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(2, 3).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>

          <TableCell className="border text-center">
            {slots(2, 4).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(2, 5).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(2, 6).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
        </TableRow>
        <TableRow className="grid grid-cols-8">
          <TableCell className="border text-center">{"4"}</TableCell>
          <TableCell className="border text-center">
            {slots(3, 0).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(3, 1).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(3, 2).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(3, 3).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(3, 4).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(3, 5).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(3, 6).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
        </TableRow>
        <TableRow className="grid grid-cols-8">
          <TableCell className="border text-center">{"5"}</TableCell>
          <TableCell className="border text-center">
            {slots(4, 0).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(4, 1).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(4, 2).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(4, 3).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>

          <TableCell className="border text-center">
            {slots(4, 4).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(4, 5).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(4, 6).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
        </TableRow>
        <TableRow className="grid grid-cols-8">
          <TableCell className="border text-center">{"6"}</TableCell>
          <TableCell className="border text-center">
            {slots(5, 0).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(5, 1).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(5, 2).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(5, 3).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(5, 4).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(5, 5).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(5, 6).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
        </TableRow>
        <TableRow className="grid grid-cols-8">
          <TableCell className="border text-center">{"7"}</TableCell>
          <TableCell className="border text-center">
            {slots(6, 0).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(6, 1).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(6, 2).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(6, 3).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(6, 4).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(6, 5).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
          <TableCell className="border text-center">
            {slots(6, 6).map((slot) => (
              <ProgramSlot
                id={slot.program.id}
                name={slot.program.name}
                key={slot.id}
              />
            ))}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
