import { signOut } from "@hono/auth-js/react"
import { Link, useLocation } from "@remix-run/react"
import { Button } from "~/components/ui/button"

export default function MainHeader() {
  // 今いるページを取得する
  const location = useLocation()
  console.log("A", location)

  // 今いるページと同じパスのボタンを黒くする

  return (
    <header className="p-4 bg-gray-300 flex justify-between">
      <div className="space-x-2">
        <Link to={"/"}>
          <Button variant={location.pathname === "/" ? "default" : "secondary"}>
            {"時間割"}
          </Button>
        </Link>
        <Link to={"/programs"}>
          <Button
            variant={
              location.pathname === "/programs" ? "default" : "secondary"
            }
          >
            {"講義一覧"}
          </Button>
        </Link>
      </div>
      <div className="flex gap-x-2">
        <Link to={"/account"}>
          <Button
            variant={location.pathname === "/account" ? "default" : "secondary"}
          >
            {"アカウント"}
          </Button>
        </Link>
        <Button
          className="flex space-x-2 w-full"
          variant={"secondary"}
          onClick={() => {
            signOut()
            alert("ログアウトしました")
          }}
        >
          {"ログアウト"}
        </Button>
      </div>
    </header>
  )
}
