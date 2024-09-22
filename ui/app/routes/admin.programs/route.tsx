import { ClassRegistrationCard } from "~/routes/admin.programs/components/class-registration-card"

/**
 * 管理者が授業やユーザーを管理するページ
 * @returns
 */
export default function Route() {
  return (
    <div className="p-4 space-y-2">
      <ClassRegistrationCard />
    </div>
  )
}
