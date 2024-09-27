import { verifyAuth } from "@hono/auth-js"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()
/**
 * 一つの講義に対する生徒たちの登録
 */
export const programEnrollmentsRoutes = app
  /**
   * 登録を作成する
   */
  .post(
    "/programs/:program/enrollments",
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

      /**
       * 対象のユーザを取得する
       */
      const user = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, authUserEmail))
        .get()

      if (user === undefined) {
        throw new HTTPException(401, { message: "Unauthorized" })
      }

      const programId = c.req.param("program")

      await db.insert(schema.enrollments).values({
        id: crypto.randomUUID(),
        programId: programId,
        userId: user.id,
      })

      return c.json({})
    },
  )
  /**
   * 複数の登録を取得する
   */
  .get("/programs/:program/enrollments", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const enrollments = await db.query.enrollments.findMany()

    const enrollmentsJson = enrollments.map((enrollment) => {
      return {
        ...enrollment,
      }
    })

    return c.json(enrollmentsJson)
  })
  /**
   * 任意の登録を取得する
   */
  .get("/programs/:program/enrollments/:enrollment", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const enrollmentId = c.req.param("enrollment")

    const enrollment = await db.query.enrollments.findFirst({
      where: eq(schema.enrollments.id, enrollmentId),
    })

    if (enrollment === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const enrollmentJson = { ...enrollment }

    return c.json(enrollmentJson)
  })
  /**
   * 任意の登録を修正する
   */
  .put("/programs/:program/enrollments/:enrollment", async (c) => {
    /**
     * 認証ユーザを取得する
     */
    const auth = c.get("authUser")

    const authUserEmail = auth.token?.email ?? null

    if (authUserEmail === null) {
      throw new HTTPException(401, { message: "Unauthorized" })
    }

    const db = drizzle(c.env.DB, { schema })

    /**
     *  対象のユーザを取得する
     */
    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, authUserEmail))
      .get()

    if (user === undefined) {
      throw new HTTPException(401, { message: "Unauthorized" })
    }

    const programId = c.req.param("programId")

    if (programId === undefined) {
      throw new HTTPException(400, { message: "Bad Request" })
    }

    await db.insert(schema.enrollments).values({
      id: crypto.randomUUID(),
      userId: user.id,
      programId: programId,
    })

    return c.json({})
  })
  /**
   * 任意の登録を削除する
   */
  .delete("/programs/:program/enrollments/:enrollment", async (c) => {
    const db = drizzle(c.env.DB)

    const enrollmentId = c.req.param("enrollment")

    await db
      .update(schema.enrollments)
      .set({ isDeleted: true })
      .where(eq(schema.enrollments.id, enrollmentId))

    return c.json({})
  })
