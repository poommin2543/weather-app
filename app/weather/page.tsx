"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define the type for weather data
type WeatherData = {
  pm25: string;
  temperature: string;
  humidity: string;
};

export default function WeatherPage() {
  // State for weather data
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  // Fetch weather data from API
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get("https://apiweather.roverautonomous.com/");
        setWeatherData(response.data); // Assign the API response to state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch weather data. Please try again.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // Update current date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Determine PM2.5 status
  const getPm25Status = (pm25: number) => {
    if (pm25 <= 25)
      return {
        color: "text-blue-500",
        message: "Good air quality. You can continue outdoor activities.",
      };
    if (pm25 <= 37)
      return {
        color: "text-green-500",
        message: "Moderate air quality. Sensitive groups should take care.",
      };
    if (pm25 <= 50)
      return {
        color: "text-yellow-500",
        message:
          "Unhealthy for sensitive groups. Avoid prolonged outdoor activity.",
      };
    if (pm25 <= 90)
      return {
        color: "text-orange-500",
        message: "Unhealthy air quality. Avoid outdoor activities.",
      };
    return {
      color: "text-red-500",
      message: "Very unhealthy air quality. Stay indoors.",
    };
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-red-500 text-xl">
        {error}
      </div>
    );

  // Parse weather data as numbers
  const pm25 = parseFloat(weatherData?.pm25 || "0");
  const temperature = parseFloat(weatherData?.temperature || "0");
  const humidity = parseFloat(weatherData?.humidity || "0");

  const pm25Status = getPm25Status(pm25);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-4 sm:px-6 py-6">
      {/* Header Section */}
      <header className="w-full flex flex-col items-center mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/th/7/7b/SUT_LOGO.png"
          alt="SUT Logo"
          className="h-20 sm:h-24 w-auto mb-4"
        />
        <div className="text-center text-gray-600 text-sm sm:text-base">
          <p>{currentDateTime}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-sm sm:max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 text-center space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Current Weather
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {/* PM2.5 */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-base sm:text-lg font-medium text-gray-500">
              PM2.5
            </p>
            <p
              className={`text-5xl sm:text-6xl font-extrabold ${pm25Status.color}`}
            >
              {pm25}
            </p>
            <p className="text-sm sm:text-base text-gray-500">
              {pm25Status.message}
            </p>
          </div>
          {/* Temperature */}
          <div className="flex flex-col items-center space-y-1">
            <p className="text-sm sm:text-base font-medium text-gray-500">
              Temperature
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-800">
              {temperature}°C
            </p>
          </div>
          {/* Humidity */}
          <div className="flex flex-col items-center space-y-1">
            <p className="text-sm sm:text-base font-medium text-gray-500">
              Humidity
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-800">
              {humidity}%
            </p>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-6 text-center text-gray-600 text-xs sm:text-sm">
        <p className="font-medium mb-2">Developer Contact</p>
        <div className="flex flex-col items-center space-y-2">
          {/* Developer Photo */}
          <img
            src="https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-6/469936754_18431939632079820_2964868283332271166_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHj8LXFYzDm2LR1aDVMc5_s9CBLB61pF-b0IEsHrWkX5qgug2aqLEzrbyXC7gZk3LgMOUOrJOHFu-j9EcOi_z0U&_nc_ohc=143q-mf999kQ7kNvgHuYyPu&_nc_oc=AdguaGE5UH_Ozg4abQTI31ACds4MfiR8OnZVUBd65cogbJKoIqrHeig-UiZiFu_JtAeQxnUprk8NqwXkzffgkQQA&_nc_zt=23&_nc_ht=scontent.fnak3-1.fna&_nc_gid=ANzzlz_s1xl9yvPHK32zXX3&oh=00_AYBhiTm1pxDCqT7VTkV5FBNI0g6vW96jBraoRT5shjuWdw&oe=679BEC1A"
            alt="Developer"
            className="h-24 w-24 rounded-full shadow-md" // Circular photo with shadow, larger size
          />

          {/* Contact Links */}
          <div className="mt-2 space-y-1">
            <a
              href="mailto:m6501228@g.sut.ac.th" // Corrected to "mailto:" for email links
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:underline"
            >
              Email: m6501228@g.sut.ac.th
            </a>
            <a
              href="https://instagram.com/noom._.poommin" // Instagram link
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:underline"
            >
              Instagram: @noom._.poommin
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
