import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { Link, useLoaderData } from "@remix-run/react"
import { useMutation } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono/client"
import { toast } from "sonner"
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

export async function loader(args: LoaderFunctionArgs) {
  const client = loaderClient(
    args.context.cloudflare.env.API.fetch.bind(args.context.cloudflare.env.API),
  )

  const resp = await client.api.programs.$get()

  const programs = await resp.json()

  return json(programs)
}

const endpoint = client.api.programs[":program"].enrollments

export default function Route() {
  const data = useLoaderData<typeof loader>()

  const mutation = useMutation<
    InferResponseType<typeof endpoint.$post>,
    Error,
    InferRequestType<typeof endpoint.$post>
  >({
    async mutationFn(props) {
      const resp = await endpoint.$post({
        param: {
          program: props.param.program,
        },
      })

      const json = await resp.json()

      return json
    },
  })

  const onSubmit = async (programId: string) => {
    const result = await mutation.mutateAsync({
      param: { program: programId },
    })
    toast("登録しました")

    if (result === null) {
      return
    }
  }

  return (
    <div className="p-4">
      {"授業一覧"}
      <Card>
        <Table className="whitespace-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead className="border-r text-center">{""}</TableHead>
              <TableHead className="border-r text-center">{"講義名"}</TableHead>
              <TableHead className="border-r text-center">{"時間枠"}</TableHead>
              <TableHead className="border-r text-center">{"曜日"}</TableHead>
              <TableHead className="border-r text-center">
                {"担当教員"}
              </TableHead>
              <TableHead className="border-r text-center">{"単位数"}</TableHead>
              <TableHead className="border-r text-center">
                {"授業概要"}
              </TableHead>
              <TableHead className="border-r text-center">
                {"実施年度"}
              </TableHead>
              <TableHead className="border-r text-center">
                {"実施時期"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="border-r text-center">
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
                <TableCell className="border-r text-center">
                  <Link to={`/programs/${program.id}`}>{program.name}</Link>
                </TableCell>
                <TableCell className="border-r text-center">
                  {program.timeSlot}
                </TableCell>
                <TableCell className="border-r text-center">
                  {program.weekSlot}
                </TableCell>
                <TableCell className="border-r text-center">
                  {program.ownerId}
                </TableCell>
                <TableCell className="border-r text-center">
                  {program.unitsCount}
                </TableCell>
                <TableCell className="border-r text-center">
                  {program.overview}
                </TableCell>
                <TableCell className="border-r text-center">
                  {program.year}
                </TableCell>
                <TableCell className="border-r text-center">
                  {program.period}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
