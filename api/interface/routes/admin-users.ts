import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()
/**
 * 管理者専用のユーザ画面
 */
export const adminUsersRoutes = app
  .post("admin/users", async (c) => {
    return c.json({})
  })
  /**
   * 複数のユーザを取得する
   */
  .get("admin/users", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const users = await db.query.programs.findMany()

    const usersJson = users.map((program) => {
      return {
        ...program,
      }
    })

    return c.json(usersJson)
  })
  /**
   * 任意のユーザを取得する
   */
  .get("admin/users/:user", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const userId = c.req.param("user")

    const user = await db.query.programs.findFirst({
      where: eq(schema.users.id, userId),
    })

    if (user === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const userJson = { ...user }

    return c.json(userJson)
  })
  .put("admin/users/:user", async (c) => {
    return c.json({})
  })
  .delete("admin/users/:user", async (c) => {
    return c.json({})
  })
