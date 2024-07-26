import { useEffect, useMemo } from 'react'

import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useGeolocation } from './lib'
import { WeatherController } from './model'

export const WeatherWidget: React.FC = observer(() => {
  const { getWeatherData, weatherData } = useMemo(() => new WeatherController(), [])

  const { location, isError } = useGeolocation()

  useEffect(() => {
    if (isError) return

    getWeatherData({
      lat: location.latitude,
      lon: location.longitude,
    })
  }, [location, isError, getWeatherData])

  if (!weatherData || isError) {
    return null
  }

  const {
    weather,
    main: { temp },
    name,
  } = weatherData

  const weatherDescription = weather[0].description
  const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`

  return (
    <div>
      <Stack className='weather-widget' direction='row' spacing={2}>
        <Stack alignItems='center' direction='row' spacing={1}>
          <img alt={weatherDescription} src={weatherIcon} />
          <Typography variant='body1'> {name}</Typography>
          <Typography> {temp}°C </Typography>
        </Stack>
      </Stack>
    </div>
  )
})
