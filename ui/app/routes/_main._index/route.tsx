import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Route() {
  return (
    <div>
      <p>{"ログインユーザーの受講状況画面"}</p>
    </div>
  )
}
