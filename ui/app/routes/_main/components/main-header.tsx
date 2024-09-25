import { Link } from "@remix-run/react"
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
      <div className="space-x-2">
        <Link to={"/"}>
          <Button>{"アカウント"}</Button>
        </Link>
        <Link to={"/"}>
          <Button>{"ログアウト"}</Button>
        </Link>
      </div>
    </header>
  )
}
