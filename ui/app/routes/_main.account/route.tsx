import {} from "@remix-run/cloudflare"
import { useSuspenseQuery } from "@tanstack/react-query"
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

  const email = data.data.email

  const onSubmit = async () => {
    alert("パスワードを変更しました")
  }

  return (
    <main className="p-4 space-y-4 container">
      <h1>{"パスワード変更"}</h1>
      <div className="space-y-2">
        <Input placeholder="メールアドレス" value={email} readOnly />
        <Input placeholder="新しいパスワード" />
      </div>
      <Button className="w-full" onClick={onSubmit}>
        {"変更"}
      </Button>
    </main>
  )
}
