import { useState, useEffect } from 'react'

type Geolocation = {
  latitude: number | null
  longitude: number | null
}

export const useGeolocation = (
  onLocationFetched?: ({ latitude, longitude }: Geolocation) => void
) => {
  const [location, setLocation] = useState<Geolocation>({
    latitude: 0,
    longitude: 0,
  })
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsError(true)
      return
    }

    const successCb: PositionCallback = (position) => {
      const { latitude, longitude } = position.coords
      setLocation({ latitude, longitude })
      if (onLocationFetched) {
        onLocationFetched({ latitude, longitude })
      }
    }

    const errorCb = () => {
      setIsError(true)
    }

    navigator.geolocation.getCurrentPosition(successCb, errorCb)
  }, [onLocationFetched])

  return { location, isError }
}
