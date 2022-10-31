import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import axios from "axios";
import moment from "moment/moment";

const options = {
  method: "GET",
  url: "https://open-weather13.p.rapidapi.com/city/lebanon",
  headers: {
    "X-RapidAPI-Key": "a805581165msh71a989517b64a1ap13b573jsn6bde0bc75dcc",
    "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
  },
};

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);
  const [magicNumbers, setMagicNumbers] = useState([12, 24, 50, 34, 94]);
  const [totalNumbers, setTotalNumbers] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    //if magic number change recalculate
    const total = magicNumbers.reduce(
      (total, magicNumbers) => total + magicNumbers,
      0
    );

    setTotalNumbers(total);
  }, [magicNumbers]);

  const fetchWeatherInfo = (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://open-weather13.p.rapidapi.com/city/lebanon",
      headers: {
        "X-RapidAPI-Key": "a805581165msh71a989517b64a1ap13b573jsn6bde0bc75dcc",
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
      params: {
        name: inputRef.current.value,
      },
    };

    axios
      .request(options)
      .then((response) => {
        setWeatherInfo(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    determineBackgroundImage();
  }, [weatherInfo]);

  const determineBackgroundImage = () => {
    if (weatherInfo?.main?.temp < 10) {
      setImage(
        "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
      );
    }

    if (weatherInfo?.main?.temp >= 10) {
      setImage(
        "https://images.unsplash.com/photo-1469122312224-c5846569feb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
      );
    }
  };

  console.log(weatherInfo);

  return (
    <div className="app" style={{ backgroundImage: `url:${image}` }}>
      <div className="app__container">
        <div className="app__info app__left">
          <h2>Our Weather App</h2>
          <h3>Your magic numbers : {magicNumbers.join(",")}</h3>
          <h4>Total of magic numbers : {totalNumbers}</h4>

          <form>
            <input ref={inputRef} type="text" placeholder="Type the city" />
            <button onClick={fetchWeatherInfo} type="submit">
              Show me the weather
            </button>
          </form>
        </div>

        <div className="app__info app__right">
          <h2>{weatherInfo?.name}</h2>
          <h2>{weatherInfo?.main.temp} Degrees Celsius</h2>
          <h3>
            {weatherInfo &&
              ` Sunrise ${moment
                .unix(weatherInfo?.sys?.sunrise)
                .format("LLLL")}`}
            {/* {new Date(parseInt(weatherInfo?.sys?.sunrise * 1000)).toLocaleDateString()}*/}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
