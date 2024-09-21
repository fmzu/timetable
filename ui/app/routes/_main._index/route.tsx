import type { MetaFunction } from "@remix-run/node"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{"月"}</TableHead>
            <TableHead>{"火"}</TableHead>
            <TableHead>{"水"}</TableHead>
            <TableHead>{"木"}</TableHead>
            <TableHead>{"金"}</TableHead>
            <TableHead>{"土"}</TableHead>
            <TableHead>{"日"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
            <TableCell>{"invoice"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
