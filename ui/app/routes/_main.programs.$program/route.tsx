import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { loaderClient } from "~/lib/loader-client"

/**
 * 授業の詳細ページ
 * @returns
 */
export async function loader(args: LoaderFunctionArgs) {
  if (!args.params.program) {
    throw new Error("Post not found")
  }

  const client = loaderClient(
    args.context.cloudflare.env.API.fetch.bind(args.context.cloudflare.env.API),
  )

  const resp = await client.api.programs[":program"].$get({
    param: { program: args.params.program },
  })

  const program = await resp.json()

  return json(program)
}

export default function Route() {
  const data = useLoaderData<typeof loader>()
  /**
   * 受講状況に応じて登録ボタンか削除ボタンのどちらかを表示する
   */
  return (
    <main className="container p-4 space-y-4">
      <h1 className="text-xl">{data.name}</h1>
      <Button>{"追加"}</Button>
      <Button>{"削除"}</Button>
      <div>
        <p>{"授業概要: "}</p>
        <p>{data.overview}</p>
      </div>
      <p className="text-sm">{`実施時期: ${data.period}`}</p>
      <p className="text-sm">{`単位数: ${data.unitsCount}`}</p>
      <p className="text-sm">{`実施時間: ${data.weekSlot}曜日 ${data.timeSlot}時間目`}</p>
    </main>
  )
}
