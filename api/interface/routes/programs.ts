import { verifyAuth } from "@hono/auth-js"
import { and, eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { schema } from "~/lib/schema"
import { apiFactory } from "../api-factory"

const app = apiFactory.createApp()
/**
 * 指定の時間枠に存在する講義
 * 作成や編集はない
 */
export const programsRoutes = app
  /**
   * 複数の講義を取得する
   */
  .get("/programs", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const programs = await db.query.programs.findMany({
      with: { owner: true },
    })

    const programsJson = programs.map((program) => {
      return {
        ...program,
      }
    })

    return c.json(programsJson)
  })
  /**
   * 任意の講義を取得する
   */
  .get(
    "/programs/:program",
    /**
     * verifyAuth()がログイン認証を行っている
     */
    verifyAuth(),
    async (c) => {
      const db = drizzle(c.env.DB, { schema })

      const programId = c.req.param("program")

      const auth = c.get("authUser")

      const authUserEmail = auth.token?.email ?? null

      if (authUserEmail === null) {
        throw new HTTPException(401, { message: "Unauthorized" })
      }

      const user = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, authUserEmail))
        .get()

      if (user === undefined) {
        throw new HTTPException(401, { message: "Unauthorized" })
      }

      const program = await db.query.programs.findFirst({
        where: eq(schema.programs.id, programId),
        with: {
          enrollments: {
            where: and(
              eq(schema.enrollments.userId, user.id),
              eq(schema.enrollments.isDeleted, false),
            ),
          },
          owner: true,
        },
      })

      if (program === undefined) {
        throw new HTTPException(404, { message: "Not found" })
      }

      const programJson = { ...program }

      return c.json(programJson)
    },
  )
