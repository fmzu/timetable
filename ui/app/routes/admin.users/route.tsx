import { useNavigate } from "@remix-run/react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { client } from "~/lib/client"

export default function Route() {
  const navigate = useNavigate()

  const [loginId, setLoginId] = useState("")

  const [password, setPassword] = useState("")

  const [role, setRole] = useState(0)

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.users.$post({
        json: {
          email: loginId,
          password: password,
        },
      })
      const json = await resp.json()
      return json
    },
  })

  const onSubmit = () => {
    const result = mutation.mutate()
    if (result === null) {
      navigate("/sign/in")
      return
    }
  }

  return (
    <div className="flex flex-col p-4 gap-y-2">
      <Card className="p-4">
        <p>{"新しいアカウント"}</p>
        <form
          className="space-y-2"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <Input
            type={"email"}
            placeholder="メールアドレス"
            value={loginId}
            onChange={(event) => {
              setLoginId(event.target.value)
            }}
          />
          <Input
            type={"password"}
            placeholder="パスワード"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          <Input
            type={"number"}
            placeholder="役割"
            value={role}
            onChange={(event) => {
              setRole(event.target.valueAsNumber)
            }}
          />
          <Button type={"submit"} className="w-full">
            {"登録する"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
