import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()
/**
 * 管理者専用の講義画面
 */
export const adminProgramsRoutes = app
  .post("admin/programs", async (c) => {
    return c.json({})
  })
  /**
   * 複数の講義を取得する
   */
  .get("admin/programs", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const programs = await db.query.programs.findMany()

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
  .get("admin/programs/:program", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const programId = c.req.param("program")

    const program = await db.query.programs.findFirst({
      where: eq(schema.programs.id, programId),
    })

    if (program === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const programJson = { ...program }

    return c.json(programJson)
  })
  .put("admin/programs/:program", async (c) => {
    return c.json({})
  })
  .delete("admin/programs/:program", async (c) => {
    return c.json({})
  })
