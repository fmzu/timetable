import { Link } from "@remix-run/react"
import { Card } from "~/components/ui/card"

type Props = {
  id: string
  name: string
}

export function ProgramSlot(props: Props) {
  return (
    <Link to={`/programs/${props.id}`}>
      <Card className="p-4">
        <p>{props.name}</p>
      </Card>
    </Link>
  )
}
