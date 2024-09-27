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
    alert("登録しました")

    if (result === null) {
      return
    }
  }

  const timeSlot = (timeSlot: number) => {
    if (timeSlot === 0) {
      return "1"
    }

    if (timeSlot === 1) {
      return "2"
    }

    if (timeSlot === 2) {
      return "3"
    }

    if (timeSlot === 3) {
      return "4"
    }

    if (timeSlot === 4) {
      return "5"
    }

    if (timeSlot === 5) {
      return "6"
    }

    if (timeSlot === 6) {
      return "7"
    }
  }

  if (timeSlot === undefined) {
    return null
  }

  const weekSlot = (weekSlot: number) => {
    if (weekSlot === 0) {
      return "月"
    }

    if (weekSlot === 1) {
      return "火"
    }

    if (weekSlot === 2) {
      return "水"
    }

    if (weekSlot === 3) {
      return "木"
    }

    if (weekSlot === 4) {
      return "金"
    }

    if (weekSlot === 5) {
      return "土"
    }

    if (weekSlot === 6) {
      return "日"
    }
  }

  if (weekSlot === undefined) {
    return null
  }

  const period = (period: number) => {
    if (period === 0) {
      return "前期"
    }

    if (period === 1) {
      return "後期"
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
            {data.map((program) => (
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
                  <Button>{"削除"}</Button>
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
                  {program.ownerId}
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
