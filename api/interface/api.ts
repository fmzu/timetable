import { authHandler } from "@hono/auth-js"
import { cors } from "hono/cors"
import { apiFactory } from "~/interface/api-factory"
import { programEnrollmentsRoutes } from "./routes/program-enrollments"
import { programsRoutes } from "./routes/programs"

export const api = apiFactory
  .createApp()
  .basePath("/api")
  .use(cors())
  .use("/auth/*", authHandler())
  .route("/", programsRoutes)
  .route("/", programEnrollmentsRoutes)
