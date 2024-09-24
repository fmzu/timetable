import { hc } from "hono/client"
import type { Api } from "~/index"

const client = hc<Api>("http://localhost:5173")

const ids = Array.from({ length: 8 }, (_, i) => {
  return crypto.randomUUID()
})

const roles = [0, 1, 2]

for (const role of roles) {
  for (const id of ids) {
    await client.api.debug.users.$post({
      json: {
        email: `${id}@hascii.com`,
        password: id,
        role,
      },
    })
  }
}
