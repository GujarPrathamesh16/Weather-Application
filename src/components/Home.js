import React, { useState } from 'react'
import '../style.css'
import searchImg from '../images/search.svg'
import cloudsImg from '../images/clouds.svg'
import rainImg from '../images/rain.svg'
import sunnyImg from '../images/sun.svg'
import mistImg from '../images/mist.png'
import drizzleImg from '../images/drizzle.svg'
import humidityIcon from '../images/humidity.svg'
import windSpeed from '../images/windSpeedB.svg'

import axios from 'axios';

function Home() {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')

    const [data, setData] = useState({
        celcius : 10,
        name: 'London',
        humidity : 10,
        speed : 2,
        description : ""
    })
    
    const handleClick = () =>{
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=87f94cececbd9eb20a0d9ec817c1ab22&units=metric`
             axios.get(apiUrl)
            .then(res=> {

                if(res.data.weather[0].main === "Clouds"){
                    setImage(cloudsImg)
                }
                else if(res.data.weather[0].main === "Clear"){
                    setImage(sunnyImg)
                }
                else if(res.data.weather[0].main === "Rain"){
                    setImage(rainImg)
                }
                else if(res.data.weather[0].main === "Drizzle"){
                    setImage(drizzleImg)
                }
                else if(res.data.weather[0].main === "Mist"){
                    setImage(mistImg)
                }
                else{
                    setImage(rainImg)
                }

                console.log(res.data)

                setData({...data,
                    celcius:res.data.main.temp,
                    name : res.data.name,
                    humidity : res.data.main.humidity,
                    speed : res.data.wind.speed,
                    description : res.data.weather[0].description
                })
            })
            .catch(err => console.log(err));
        }
    }
  return (
    <div className='container'>
        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)}/>
                <button>
                    <img src={searchImg} onClick={handleClick} alt="loading.." />
                </button>
            </div>
            <div className="winfo">
                <img src={image} alt="loading" className='icon' />
                <h1>{Math.round(data.celcius)}°C</h1>
                <h3>{data.description}</h3>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="col">
                        <img src={humidityIcon} alt="" />
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                        <img src={windSpeed} alt="" />
                            <div className='windSpeed'>
                                <p>{data.speed}Km/hr</p>
                                <p>Wind</p>
                            </div>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
