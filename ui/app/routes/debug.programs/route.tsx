import { ProgramRegistrationCard } from "~/routes/debug.programs/components/program-registration-card"

/**
 * 管理者が授業やユーザーを管理するページ
 * @returns
 */
export default function Route() {
  return (
    <main className="p-4 container">
      <ProgramRegistrationCard />
    </main>
  )
}
