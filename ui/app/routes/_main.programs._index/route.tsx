import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { Link, useLoaderData } from "@remix-run/react"
import { useMutation } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono/client"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { client } from "~/lib/client"
import { loaderClient } from "~/lib/loader-client"
import { period } from "~/lib/period"
import { timeSlot } from "~/lib/time-slot"
import { weekSlot } from "~/lib/week-slot"

export async function loader(args: LoaderFunctionArgs) {
  const client = loaderClient(
    args.context.cloudflare.env.API.fetch.bind(args.context.cloudflare.env.API),
  )

  const resp = await client.api.programs.$get()

  const programs = await resp.json()

  return json(programs)
}

const addEndpoint = client.api.programs[":program"].enrollments

export default function Route() {
  const programsData = useLoaderData<typeof loader>()

  const addMutation = useMutation<
    InferResponseType<typeof addEndpoint.$post>,
    Error,
    InferRequestType<typeof addEndpoint.$post>
  >({
    async mutationFn(props) {
      const resp = await addEndpoint.$post({
        param: {
          program: props.param.program,
        },
      })

      const json = await resp.json()

      return json
    },
  })

  const onSubmit = async (programId: string) => {
    const result = await addMutation.mutateAsync({
      param: { program: programId },
    })
    alert("登録しました")

    if (result === null) {
      return
    }
  }

  /**
   * 授業時間枠、曜日枠、前期後期の実施期間を日本語に変換する
   */
  return (
    <main className="p-4 container">
      <h1>{"授業一覧"}</h1>
      <Card>
        <Table className="whitespace-nowrap border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="border text-center">{""}</TableHead>
              <TableHead className="border text-center">{"講義名"}</TableHead>
              <TableHead className="border text-center">{"時間枠"}</TableHead>
              <TableHead className="border text-center">{"曜日"}</TableHead>
              <TableHead className="border text-center">{"担当教員"}</TableHead>
              <TableHead className="border text-center">{"単位数"}</TableHead>
              <TableHead className="border text-center">{"授業概要"}</TableHead>
              <TableHead className="border text-center">{"実施年度"}</TableHead>
              <TableHead className="border text-center">{"実施時期"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programsData.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="border text-center">
                  <form
                    className="space-y-2"
                    onSubmit={(event) => {
                      event.preventDefault()
                      onSubmit(program.id)
                    }}
                  >
                    <Button>{"追加"}</Button>
                  </form>
                </TableCell>
                <TableCell className="border text-center">
                  <Link to={`/programs/${program.id}`}>{program.name}</Link>
                </TableCell>
                <TableCell className="border text-center">
                  {timeSlot(program.timeSlot)}
                </TableCell>
                <TableCell className="border text-center">
                  {weekSlot(program.weekSlot)}
                </TableCell>
                <TableCell className="border text-center">
                  {program.owner.name}
                </TableCell>
                <TableCell className="border text-center">
                  {program.unitsCount}
                </TableCell>
                <TableCell className="border text-center">
                  {program.overview}
                </TableCell>
                <TableCell className="border text-center">
                  {program.year}
                </TableCell>
                <TableCell className="border text-center">
                  {period(program.period)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  )
}
