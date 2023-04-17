import React, { useState, useCallback, FC } from 'react';
import useFetch from '../Hooks/useFetch.tsx';
import styled from 'styled-components';
import WeatherTable from './WeatherTable.tsx';

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const Input = styled.input`
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 600px;
  border: 2px solid #777;
  border-radius: 0.5rem;
`;

interface UseFetch {
  fetchData: (url: string) => Promise<any>;
  loading: boolean;
}

const CityInput: FC = () => {
  const [input, setInput] = useState<string | null>('');

  const [error, setError] = useState<string | null>(null);
  const [dailyForecast, setDailyForecast] = useState<any[] | null>(null);
  const { fetchData, loading }: UseFetch = useFetch();
  const [currentCity, setCurrentCity] = useState<string | null>(null);

  const fetchGeoLocation = useCallback(
    async (address: string, benchmark: string, format: string) => {
      try {
        const response = await fetchData(
          `https://cors-anywhere.herokuapp.com/https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(
            address
          )}&benchmark=${benchmark}&format=${format}`
        );
        const coordinates = response.json.result.addressMatches[0].coordinates;
        return coordinates;
      } catch (error) {
        setError(error.message);
      }
    },
    []
  );

  const fetchWeather = useCallback(async (coordinates: { x: number; y: number }) => {
    try {
      const response = await fetchData(`https://api.weather.gov/points/${coordinates.y.toFixed(4)},${coordinates.x.toFixed(4)}`);
      const data = response.json;
      if (data.properties.forecast) {
        const forecastResponse = await fetchData(data.properties.forecast);
        const forecastData = await forecastResponse.json;
        let dailyForecast = [];
        while(forecastData.properties.periods.length > 0) {
          dailyForecast.push(forecastData.properties.periods.splice(0,2));
        }
        setDailyForecast(dailyForecast);
        setError(null);
        setCurrentCity(input);
      } else {
        setError('No results found');
      }
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleSearch = async () => {
    const benchmark = '2020';
    const format = 'json';

    (async () => {
      const coordinates = await fetchGeoLocation(input, benchmark, format);
      if (coordinates) {
        await fetchWeather(coordinates);
      }else{
        setError('No results found');
        setDailyForecast(null);
      }
    })();
  };

  return (
    <>
      <Title>Search for a USA Address</Title>
      <Input
        type="text"
        placeholder="Enter an address (Press Enter to search)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      {error !== null && <p>{error}</p>}
      {dailyForecast !== null && <WeatherTable positions={dailyForecast} />}
    </>
  );
};

export default CityInput;
