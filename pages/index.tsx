import { Inbox } from "components/Inbox"
import { Output } from "components/Output"
import Head from "next/head"

const Index = () => (
  <>
    <Head>
      <title>Disposable Email</title>
    </Head>
    <Output />
    <Inbox />
  </>
)

export default Index
