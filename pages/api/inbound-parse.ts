import { IncomingForm } from "formidable"
import { NextApiRequest, NextApiResponse } from "next"
import Pusher from "pusher"

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true
})

export default function ParseInbound(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new IncomingForm()
    form.parse(req, (_error, { from, to, subject, html }) => {
      const id = typeof to === "string" ? to.split("@")[0] : to[0].split("@")[0]
      pusher.trigger(
        `private-${id}`,
        "new-email",
        { from, to, subject, html },
        () => res.end()
      )
    })
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}
