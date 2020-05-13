import { useContext, useEffect, useState } from "react"
import { PusherContext } from "utils/Context"

interface UsePusherProps {
  channel: string
  event: string
}

export function usePusherBind({ channel, event }: UsePusherProps) {
  const [data, setData] = useState(null)
  const pusher = useContext(PusherContext)
  useEffect(() => {
    if (pusher) {
      if (pusher.channel(channel)) {
        return pusher.channel(channel).bind(event, data => setData(data))
      }
      const subscribedChannel = pusher.subscribe(channel)
      subscribedChannel.bind("pusher:subscription_succeeded", () => {
        subscribedChannel.bind(event, data => setData(data))
      })
      return () => {
        pusher.unsubscribe(channel)
      }
    }
  }, [channel, event, pusher])

  return { data }
}
