import {} from "@remix-run/cloudflare"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono/client"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { client } from "~/lib/client"

export default function Route() {
  /**
   * 個人向けのデータはuseSuspenseQueryで取得するのが向いている
   */
  const data = useSuspenseQuery({
    /**
     * キャッシュするためのキー
     * ページごとに変える
     */
    queryKey: ["password"],
    async queryFn() {
      const resp = await client.api.my.user.$get()

      const timetable = await resp.json()

      return timetable
    },
  })

  const endpoint = client.api.my.user

  const [password, setPassword] = useState("")

  const mutation = useMutation<
    InferResponseType<typeof endpoint.$put>,
    Error,
    InferRequestType<typeof endpoint.$put>
  >({
    async mutationFn(props) {
      const resp = await endpoint.$put({
        json: {
          password: props.json.password,
        },
      })

      const json = await resp.json()

      return json
    },
  })

  const onSubmit = async (password: string) => {
    const result = await mutation.mutateAsync({
      json: {
        password: password,
      },
    })
    alert("パスワードを変更しました")

    if (result === null) {
      return
    }
  }

  return (
    <main className="p-4 space-y-4 container">
      <h1>{"パスワード変更"}</h1>
      <form
        className="space-y-2"
        onSubmit={() => {
          onSubmit(password)
        }}
      >
        <Input
          type={"text"}
          placeholder="新しいパスワード"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />
        <Button className="w-full">{"変更"}</Button>
      </form>
    </main>
  )
}
