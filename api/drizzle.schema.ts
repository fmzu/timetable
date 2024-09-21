import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

/**
 * 講義
 */
export const programs = sqliteTable("programs", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  name: text("name", { length: 256 }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const programRelations = relations(programs, (fn) => {
  return {
    enrollments: fn.many(enrollments),
  }
})

export const users = sqliteTable("users", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  name: text("name", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull().unique(),
  hashedPassword: text("hashed_password", { length: 256 }).notNull(),
  login: text("login", { length: 256 }).notNull().unique(),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const userRelations = relations(users, (fn) => {
  return {
    enrollments: fn.many(enrollments),
  }
})

/**
 * 講義の受講登録
 */
export const enrollments = sqliteTable("enrollments", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  userId: text("user_id", { length: 36 }).notNull(),
  programId: text("program_id", { length: 36 }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const enrollmentRelations = relations(enrollments, (fn) => {
  return {
    user: fn.one(users, {
      fields: [enrollments.userId],
      references: [users.id],
    }),
    program: fn.one(programs, {
      fields: [enrollments.programId],
      references: [programs.id],
    }),
  }
})
