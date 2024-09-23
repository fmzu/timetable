import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
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

  return (
    <main className="container p-4 space-y-4">
      <h1>{data.name}</h1>
      <p>{data.overview}</p>
      <p className="text-sm">{`実施時期: ${data.period}`}</p>
      <p className="text-sm">{`単位数: ${data.unitsCount}`}</p>
      <p className="text-sm">{`実施時間: ${data.weekSlot}曜日 ${data.timeSlot}時間目`}</p>
    </main>
  )
}
