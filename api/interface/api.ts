import { authHandler, initAuthConfig } from "@hono/auth-js"
import { apiFactory } from "~/interface/api-factory"
import { authConfig } from "~/interface/auth-config"
import { usersRoutes } from "~/interface/routes/users"
import { programEnrollmentsRoutes } from "./routes/program-enrollments"
import { programsRoutes } from "./routes/programs"

export const api = apiFactory
  .createApp()
  .basePath("/api")
  .use("*", initAuthConfig(authConfig))
  .use("/auth/*", authHandler())
  .route("/", programsRoutes)
  .route("/", programEnrollmentsRoutes)
  .route("/users", usersRoutes)
