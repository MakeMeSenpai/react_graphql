import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from '../index'
import './weather.css'

function Weather() {
    const [ zip, setZip ] = useState('')
    // const [ units, setUnits] = useState('')
    const [ weather, setWeather ] = useState(null)
    return (
        <div className="Weather">

            {weather ? <div className="contain"><h1>
              {weather.data.getWeather.temperature}
            </h1>

            <h1>
              {weather.data.getWeather.description}
            </h1>

            <details>
              <summary>More </summary>
              <h2>
                {weather.data.getWeather.feels_like}
              </h2>

              <h2>
                {weather.data.getWeather.temp_min}
              </h2>

              <h2>
                {weather.data.getWeather.temp_max}
              </h2>

              <h2>
                {weather.data.getWeather.humidity}
              </h2>

              <h2>
                {weather.data.getWeather.cod}
              </h2>

              <h2>
                {weather.data.getWeather.message}
              </h2>
            </details></div>
            : null}

            <form onSubmit={(e) => {
                e.preventDefault()
                getWeather()}}>
                <input 
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                />
                {/* <label>Metric</label>
                <input type="radio" name="units" value="metric" onClick={() => setUnits.value = 'metric'}/>
                <label>Imperial</label>
                <input type="radio" name="units" value="imperial" onClick={() => setUnits.value = 'imperial'}/> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );

    async function getWeather() {
        try {
          const json = await client.query({
            query: gql`
              query {
                getWeather(zip:${zip}, units:imperial) {
                  temperature
                  description
                  feels_like
                  temp_min
                  temp_max
                  humidity
                  cod
                  message
                }
              }
            `
          })
          setWeather(json)
        } catch(err) {
          console.log(err.message)
        }
      }
  }

export default Weather
