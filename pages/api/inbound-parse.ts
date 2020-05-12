import { NextApiRequest, NextApiResponse } from "next"
import { IncomingForm } from "formidable"

export default (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm()
  form.parse(req, (_error, fields) => {
    console.log(fields.from)
    console.log(fields.to)
    console.log(fields.subject)
    console.log(fields.html)
  })
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}
