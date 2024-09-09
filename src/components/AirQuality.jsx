import React, { useEffect, useState } from 'react';

const AirQuality = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.airvisual.com/v2/city?city=Trinidad&state=Beni&country=Bolivia&key=TU_CLAVE_API');
      //api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key={{YOUR_API_KEY}}
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  const getAQICategory = (aqi) => {
    if (aqi <= 50) return 'Bueno';
    if (aqi <= 100) return 'Moderado';
    if (aqi <= 150) return 'Perjudicial para grupos sensibles';
    if (aqi <= 200) return 'Perjudicial';
    if (aqi <= 300) return 'Muy perjudicial';
    return 'Peligroso';
  };

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">Calidad del Aire en Trinidad, Beni</h1>
      <p>Índice de Calidad del Aire: {data.current.pollution.aqius}</p>
      <p>Temperatura: {data.current.weather.tp}°C</p>
      <p>Humedad: {data.current.weather.hu}%</p>
    </div>
  );
};

export default AirQuality;