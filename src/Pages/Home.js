import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphql/Queries";

function Home() {
  const [citySearched, setCitySearched] = useState("");
  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearched },
  });

  if (error) return <h1> Error found</h1>;

  if (data) {
    console.log(data);
  }

  return (
    <div className="App">
      <h1>Search For Weather</h1>
      <div className="search-box">
      <input
        type="text"
        placeholder="Enter City name"
        className="search-bar"
        onChange={(event) => {
          setCitySearched(event.target.value);
        }}
      />
      </div>
      <button  class="action-button shadow animate green" onClick={() => getWeather()}> Search</button>
      <div className="weather">
        {data && data?.getCityByName ? (
          <> 
          <div className="location-box">
            <div className="location"> {data?.getCityByName?.name} </div>
          </div>
            <div className="weather-box">
            <div className="temp">
              {" "}
              Temperature: {Math.round(data?.getCityByName?.weather.temperature.actual)}°
            </div>
            <div className="weather">
            <p>
              Weather: {data?.getCityByName?.weather.summary.description}
            </p>
            <p>Wind Speed: {data?.getCityByName?.weather.wind.speed}</p>
            </div>
            </div>
          </>
        ) : ('')}
      </div>
    </div>
  );
}

export default Home;
