import hrt from "human-readable-time";
import { useEffect, useState } from "react";
import weatherLogos from "@/constants/logo";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { ImProfile } from "react-icons/im";

const WeatherFeed = ({ condition, info }) => {
  const [session, setSession] = useState("AM");
  useEffect(() => {
    if (hrt(new Date(), "%hh%") > 12) {
      setSession("PM");
    } else {
      setSession("AM");
    }
  }, [info]);
  return (
    <div className="text-white w-[100%]  hidden md:flex h-[100%] flex-col">
      <div className="font-bold drop-shadow-2xl text-gray-600 ">
        <ul className="card-title">
          <li>WEATHERLY - NATIONAL WEATHER</li>
        </ul>
      </div>
      <div className="card-details mt-28   ">
        <div className=" font-bold">Weather Forecast</div>
        <div className="text-[60px] text-white">{condition}</div>
        <div>
          <ul>
            <li className="text-[15px] text-white">
              {hrt(new Date(), "%DD%-%MM%-%YYYY% ")}
            </li>
            <li className="text-[15px] text-white">
              {hrt(new Date(), "%day%")}
            </li>
            <li className="text-[15px] text-white">
              {hrt(new Date(), "%hh%:%mm%")} &nbsp;
              {session}
            </li>
          </ul>
        </div>
        <div className="pr-[2rem] mt-[35px]">
          <ul className="flex">
            {weatherLogos.map((l, i) => {
              return (
                <li className="mr-4 text-xl" key={i}>
                  <l.logo />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="text-gray-300 text-[13px] w-[40vw] text-justify ">
          You go-to web app for real-time weather updates. Get instant access to
          accurate temperature, humidity, wind speed, and more for any location.
          With a user-friendly interface and customizable features, Weatherly
          keeps you informed and prepared for any weather conditions.
        </div>

        <div className="mt-[35px]">
          <ul className="flex  ">
            <li className="text-gray-300 hover:text-white bg-gray-600 bg-opacity-30 hover:bg-black p-3 ml-1 pt-2 pb-2 rounded-[25px] ">
              <a
                href="https://github.com/jayant413/Weather-App"
                target="_blank"
                className="flex "
              >
                GitHub <AiFillGithub className="ml-2" />
              </a>
            </li>
            <li className="text-gray-300 hover:text-white bg-gray-600 bg-opacity-30 hover:bg-blue-500 p-3 ml-5 pt-2 pb-2 rounded-[25px]">
              <a
                href="https://www.linkedin.com/in/jayant-sawarkar-401-/"
                target="_blank"
                className="flex "
              >
                LinkdIn <AiFillLinkedin className="ml-2" />{" "}
              </a>
            </li>
            <li className="text-gray-300 hover:text-white bg-gray-600 bg-opacity-30 hover:bg-orange-500 p-3 ml-5 pt-2 pb-2 rounded-[25px]">
              <a
                href="https://jayantsawarkar.vercel.app/"
                target="_blank"
                className="flex "
              >
                Portfolio <ImProfile className="ml-2" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherFeed;
