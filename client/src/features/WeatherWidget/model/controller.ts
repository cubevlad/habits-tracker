import axios from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather'

export class WeatherController {
  public weatherData: any = null

  static commonHeaders = null

  constructor() {
    makeAutoObservable(this)
  }

  getWeatherData = async ({
    lat,
    lon,
  }: {
    lat: number | null
    lon: number | null
    exclude?: string
  }) => {
    if (!lat || !lon) {
      return
    }

    try {
      const response = await axios.get(BASE_URL_WEATHER, {
        params: {
          lat,
          lon,
          units: 'metric',
          lang: 'ru',
          appid: API_KEY,
        },
        // @ts-expect-error
        headers: WeatherController.commonHeaders,
      })

      runInAction(() => {
        this.weatherData = response.data
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }
}
