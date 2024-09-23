import { hc } from "hono/client"
import type { Api } from "~/../api"

type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>

export const loaderClient = (fetch: Fetch) => {
  return hc<Api>("http://localhost", {
    fetch(input: RequestInfo | URL, init?: RequestInit) {
      return fetch(input.toString(), init)
    },
  })
}
