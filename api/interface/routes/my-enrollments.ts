import { verifyAuth } from "@hono/auth-js"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()
/**
 * 自分の受講登録の一覧
 */
export const myEnrollmentsRoutes = app
  /**
   * 自分の受講登録の一覧を取得する
   */
  .get(
    "/my/enrollments",
    /**
     * verifyAuth()がログイン認証を行っている
     */
    verifyAuth(),
    async (c) => {
      /**
       * 認証ユーザを取得する
       */
      const auth = c.get("authUser")

      const authUserEmail = auth.token?.email ?? null

      if (authUserEmail === null) {
        throw new HTTPException(401, { message: "Unauthorized" })
      }

      const db = drizzle(c.env.DB, { schema })

      const user = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, authUserEmail))
        .get()

      if (user === undefined) {
        throw new HTTPException(401, { message: "Unauthorized" })
      }

      const myEnrollments = await db.query.enrollments.findMany({
        where: eq(schema.enrollments.userId, user.id),
        with: { program: true },
      })

      const myEnrollmentsJson = myEnrollments.map((enrollment) => {
        return {
          ...enrollment,
          program: {
            ...enrollment.program,
          },
        }
      })

      return c.json(myEnrollmentsJson)
    },
  )
