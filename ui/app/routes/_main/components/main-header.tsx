import { signOut } from "@hono/auth-js/react"
import { Link } from "@remix-run/react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"

export default function MainHeader() {
  return (
    <header className="p-4 bg-gray-100 flex justify-between">
      <div className="space-x-2">
        <Link to={"/"}>
          <Button>{"時間割"}</Button>
        </Link>
        <Link to={"/programs"}>
          <Button>{"講義一覧"}</Button>
        </Link>
      </div>
      <div className="flex gap-x-2">
        <Link to={"/"}>
          <Button>{"アカウント"}</Button>
        </Link>
        <Button
          className="flex space-x-2 w-full"
          onClick={() => {
            signOut()
            toast("ログアウトしました")
          }}
        >
          {"ログアウト"}
        </Button>
      </div>
    </header>
  )
}
