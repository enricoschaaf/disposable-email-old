import { usePusherBind } from "hooks/usePusherBind"
import { useContext, useEffect, useState } from "react"
import { LocalContext } from "utils/Context"

export const Inbox = () => {
  const [emails, setEmails] = useState([])
  const local = useContext(LocalContext)
  const { data: email } = usePusherBind({
    channel: `private-${local}`,
    event: "new-email"
  })

  useEffect(() => {
    if (email) {
      setEmails(previousState => [...previousState, email])
    }
  }, [email])

  if (emails.length > 0) {
    return emails.map(({ from, to, subject, html }, index) => (
      <ul key={index}>
        <li>{from}</li>
        <li>{to}</li>
        <li>{subject}</li>
        <li>{html}</li>
      </ul>
    ))
  }

  return null
}
