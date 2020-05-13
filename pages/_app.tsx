import { customAlphabet } from "nanoid"
import { AppProps } from "next/app"
import Pusher from "pusher-js"
import { useEffect, useState } from "react"
import { LocalContext, PusherContext } from "utils/Context"
import "../styles/index.css"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 7)

function App({ Component, pageProps }: AppProps) {
  const [pusher, setPusher] = useState(null)
  const [local, setLocal] = useState(null)

  useEffect(() => {
    setPusher(
      new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        authEndpoint: "/api/pusher/auth"
      })
    )
    setLocal(nanoid())
  }, [])

  return (
    <LocalContext.Provider value={local}>
      <PusherContext.Provider value={pusher}>
        <Component {...pageProps} />
      </PusherContext.Provider>
    </LocalContext.Provider>
  )
}

export default App
