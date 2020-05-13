import { useContext } from "react"
import { LocalContext } from "utils/Context"

export const Output = () => {
  const local = useContext(LocalContext)

  if (local) {
    return (
      <div>
        <span>{`${local}@${process.env.NEXT_PUBLIC_DOMAIN}`}</span>
      </div>
    )
  }

  return null
}
