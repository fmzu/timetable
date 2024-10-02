import { Link } from "@remix-run/react"
import { Card } from "~/components/ui/card"

type Props = {
  id: string
  name: string
  className?: string
}

export function ProgramSlot(props: Props) {
  return (
    <Link to={`/programs/${props.id}`}>
      <Card className="p-2">
        <p className={props.className}>{props.name}</p>
      </Card>
    </Link>
  )
}
