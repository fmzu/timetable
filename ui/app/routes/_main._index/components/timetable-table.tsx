import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

type Props = {
  renderSlots: (weekSlot: number, timeSlot: number) => JSX.Element
}

export function TimetableTable(props: Props) {
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
        {[...Array(7)].map((_, rowIndex) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <TableRow key={rowIndex} className="grid grid-cols-8">
            <TableCell className="border text-center">{rowIndex + 1}</TableCell>
            {[...Array(7)].map((_, colIndex) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableCell key={colIndex} className="border text-center">
                {props.renderSlots(rowIndex, colIndex)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
