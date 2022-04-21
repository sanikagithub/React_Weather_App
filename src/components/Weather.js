import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    zipcode: ""
      });

  const APIKEY = "c3ba3feb0d7255df6d7b350831c910aa";
  async function weatherData(e) {
    e.preventDefault();
    if (form.zipcode == "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${form.zipcode},US&units=imperial&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "zipcode") {
      setForm({ ...form, zipcode: value });
    }
  };
  return (
    <div className="weather">
      <span className="title">Current Weather</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="zipcode"
          name="zipcode"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {/* {console.log(weather)} */}
      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;