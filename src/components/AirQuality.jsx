import React, { useEffect, useState } from 'react';
import {
  GoodIcon,
  ModerateIcon,
  UnhealthySensitiveIcon,
  UnhealthyIcon,
  HazardousIcon
} from './airQualityIcons.jsx';

const AirQuality = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/data/airQualityData.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    fetchData();
  }, []);

  const getAQICategory = (aqi) => {
    if (aqi === 1) return 'Bueno';
    if (aqi === 2) return 'Moderado';
    if (aqi === 3) return 'Perjudicial para grupos sensibles';
    if (aqi === 4) return 'Perjudicial';
    if (aqi === 5) return 'Peligroso';
  };

  const getAQIBg= (aqi) => {
    if (aqi === 1) return 'bg-green-500';
    if (aqi === 2) return 'bg-yellow-500';
    if (aqi === 3) return 'bg-orange-500';
    if (aqi === 4) return 'bg-red-500';
    if (aqi === 5) return 'bg-purple-950';
  };

  const getAQIIcon = (aqi) => {
    if (aqi === 1) return <GoodIcon />;
    if (aqi === 2) return <ModerateIcon />;
    if (aqi === 3) return <UnhealthySensitiveIcon />;
    if (aqi === 4) return <UnhealthyIcon />;
    if (aqi === 5) return <HazardousIcon className='w-20 text-white'/>;
  };

  if (!data) {
    return <div>Cargando...</div>;
  }

  const { list } = data;
  const { main, components, dt } = list[0];
  //usar el dt a la hora de mostrar la fecha
  const dateNow = new Date(dt * 1000);
  const date = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`;

  return (
    <div className="bg-white rounded shadow overflow-hidden max-w-2xl mx-auto">
      <div className={`p-4 ${getAQIBg(main.aqi)} flex justify-between`}>
        <div className='text-white'>
            <h2>Índice de la Calidad del Aire</h2>
            <p className='text-4xl font-bold'>{getAQICategory(main.aqi)}</p>
        </div>
        <div>
          {getAQIIcon(main.aqi)}
        </div>
      </div>
    </div>
  );
};

export default AirQuality;