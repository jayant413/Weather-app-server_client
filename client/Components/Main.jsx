import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TbTemperature } from "react-icons/tb";
import WeatherFeed from "./weatherFeed";
import hrt from "human-readable-time";
const api_key = "83eaf893777c44e482d42521232706";

const Main = () => {
  const [session, setSession] = useState("AM");
  const [cityName, setCityName] = useState("");
  const [location, setLocation] = useState([]);
  const [info, setInfo] = useState([]);
  useEffect(() => {
    fetchData("Nagpur");
  }, []);

  useEffect(() => {
    if (hrt(new Date(), "%hh%") > 12) {
      setSession("PM");
    } else {
      setSession("AM");
    }
  }, [info]);

  const fetchData = (cityName) => {
    try {
      if (cityName !== "") {
        fetch(`http://localhost:8040/api/weather/${cityName}`)
          .then((res) => res.json())
          .then((res) => {
            setInfo(res?.current);
            setLocation(res?.location);
          });
        document.body.style.backgroundImage =
          "url('https://picsum.photos/seed/" + cityName + "/1600/900')";
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="flex h-[100vh]">
      <div className="card md:w-[40vw]">
        <div className="search">
          <TbTemperature style={{ fontSize: "25px" }} />
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            onKeyUp={(e) => (e.key === "Enter" ? fetchData(cityName) : "")}
          />
          <button
            onClick={() => {
              fetchData(cityName);
            }}
          >
            <AiOutlineSearch />
          </button>
        </div>
        {info ? (
          <div className="weather loading pl-3">
            <div className="text-4xl mt-6  ">
              <div>Weather in </div>
              <div className="text-sky-800 font-serif font-semibold">
                {location?.name}
              </div>
            </div>
            <span className="text-xl">
              {location.region}, {location.country}
            </span>
            <h1 className="text-6xl mt-4 ">{info?.temp_c}°C</h1>
            <div className="flex">
              <img
                src={`https:${info?.condition?.icon}`}
                alt=""
                className="icon"
              />
              <div className="text-xl justify-center ml-4">
                {info?.condition?.text}
              </div>
            </div>
            <div className=" md:mt-2 flex justify-between pl-2 pr-2">
              <div>
                <ul className="text-[17px]">
                  <li>Date </li>
                  <li>Humidity </li>
                  <li>Wind Speed </li>
                  <li>Pressure </li>
                  <li className="hidden md:flex">Local Time </li>
                  <li>Temperature </li>
                </ul>
              </div>
              <div>
                <ul className="text-[17px]">
                  <li>{hrt(new Date(), "%DD%-%MM%-%YYYY% ")}</li>
                  <li>{info?.humidity} %</li>
                  <li>{info?.wind_kph} km/h</li>
                  <li>{info?.pressure_in}</li>
                  <li className="hidden md:flex">
                    {hrt(new Date(), "%hh%:%mm%")} &nbsp;
                    {session}
                  </li>
                  <li>{info?.temp_f}°F</li>
                </ul>
              </div>
            </div>
            <div className="mt-5 md:mt-8 ml-2 text-sm text-gray-400">
              <a href="https://jayantsawarkar.vercel.app/" target="_blank">
                Weather app by &copy; Jayant
              </a>
            </div>
          </div>
        ) : (
          <div className="weather loading">
            <br />
            <br />
            Please Enter a valid CityName.
            <br />
            Then try Again !!
            <br />
            <br />
            <div className="mt-8 md:mt-16 ml-2 text-sm text-gray-400">
              <a href="https://jayantsawarkar.vercel.app/" target="_blank">
                Weather app by &copy; Jayant
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:flex md:w-[60vw] ">
        <WeatherFeed condition={info?.condition?.text} info={info} />
      </div>
    </div>
  );
};

export default Main;
