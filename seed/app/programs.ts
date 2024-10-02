import { hc } from "hono/client"
import { OpenAI } from "openai"
import { zodResponseFormat } from "openai/helpers/zod.mjs"
import { array, object, string } from "zod"
import type { Api } from "~/../api"

const client = hc<Api>("http://localhost:5173/")

const resp = await client.api.debug.users.$get({
  query: {
    role: "1",
  },
})

const users = await resp.json()

const getRandomUser = () => {
  const user = users[Math.floor(Math.random() * users.length)]
  return user
}

const openai = new OpenAI({
  apiKey: Bun.env.OPENAI_API_KEY,
})

const vProgram = object({
  name: string(),
  overview: string(),
  // description_256: string(),
})

const schema = object({
  programs: array(vProgram),
})

/**
 * https://openai.com/index/introducing-structured-outputs-in-the-api/
 */
const chat = await openai.beta.chat.completions.parse({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: "日本のSF要素のある2080年の工学部の講義で16個出力してください",
    },
  ],
  response_format: zodResponseFormat(schema, "schema"),
})

const jsonText = chat.choices[0].message.content

if (jsonText === null) {
  throw new Error("jsonText is null")
}

const result = schema.parse(JSON.parse(jsonText))

const getPeriod = () => {
  return Math.floor(Math.random() * 2)
}

for (const program of result.programs) {
  await client.api.debug.programs.$post({
    json: {
      name: program.name,
      timeSlot: Math.floor(Math.random() * 7),
      weekSlot: Math.floor(Math.random() * 7),
      ownerId: getRandomUser().id,
      unitsCount: Math.floor(Math.random() * 3) + 1,
      overview: program.overview,
      year: 2080,
      period: getPeriod(),
    },
  })
}
