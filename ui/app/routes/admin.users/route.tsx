import { Card } from "~/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { UserRegistrationCard } from "~/routes/admin.users/components/user-registration-card"

export default function Route() {
  return (
    <main className="flex flex-col p-4 gap-y-2 container">
      <UserRegistrationCard />
      <Card>
        <Table className="whitespace-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead className="border-r text-center">{""}</TableHead>
              <TableHead className="border-r text-center">
                {"メールアドレス"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border-r text-center">{"1"}</TableCell>
              <TableCell className="border-r text-center">
                {"invoice"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </main>
  )
}
