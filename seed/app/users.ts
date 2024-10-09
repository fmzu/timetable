import { hc } from "hono/client"
import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod.mjs"
import { array, object, string } from "zod"
import type { Api } from "~/../api"

const openai = new OpenAI({
  apiKey: Bun.env.OPENAI_API_KEY,
})

const vUser = object({
  name: string(),
})

const schema = object({ users: array(vUser) })

/**
 * https://openai.com/index/introducing-structured-outputs-in-the-api/
 */
const chat = await openai.beta.chat.completions.parse({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: "日本人のちょっと変わった名前の大学教員を8人出力してください",
    },
  ],
  response_format: zodResponseFormat(schema, "schema"),
})

const jsonText = chat.choices[0].message.content

if (jsonText === null) {
  throw new Error("jsonText is null")
}

const result = schema.parse(JSON.parse(jsonText))

const client = hc<Api>("http://localhost:5173/")

for (const user of result.users) {
  await client.api.debug.users.$post({
    json: {
      email: `${crypto.randomUUID()}@hascii.com`,
      password: crypto.randomUUID(),
      name: user.name,
      role: 1,
    },
  })
}

// const chatCompletion = await client.chat.completions.create({
//   messages: [
//     { role: "system", content: "日本人の大学教員を8人出力してください" },
//   ],
//   model: "gpt-4o-mini",
//   response_format: {
//     type: "json_schema",
//     json_schema: {
//       name: "大学教員",
//       description: "大学教員の情報",
//       strict: true,
//       schema: toJsonSchema(schema) as never,
//     },
//   },
// })
