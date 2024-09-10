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
    if (aqi === 3) return 'bg-orange-700';
    if (aqi === 4) return 'bg-red-600';
    if (aqi === 5) return 'bg-purple-950';
  };

  const getAQIIcon = (aqi) => {
    if (aqi === 1) return <GoodIcon className='w-20 text-white' />;
    if (aqi === 2) return <ModerateIcon className='w-20 text-white' />;
    if (aqi === 3) return <UnhealthySensitiveIcon className='w-20 text-white' />;
    if (aqi === 4) return <UnhealthyIcon className='w-20 text-white' />;
    if (aqi === 5) return <HazardousIcon className='w-20 text-white'/>;
  };

  if (!data) {
    return <div>Cargando...</div>;
  }

  const { list } = data;
  const { main, components, dt } = list[0];
  //usar el dt a la hora de mostrar la fecha
  const dateNow = new Date(dt * 1000);
  const date = `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`;
  const time = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;
  
  //promedio de los componentes
  const average = Object.values(components).reduce((acc, value) => acc + value, 0) / Object.values(components).length;
  
  //------------LOGICA COMPONENTS DATA --------------
  // rangos para contaminantes
  const ranges = {
    so2: [20,80,250,350],
    no2: [40,70,150,200],
    pm10: [20,50,100,200],
    pm2_5: [10,25,50,75],
    o3: [60,100,140,180],
    co:[4400,9400,12400,15400]
  }
  //funcion para obtener el indice cualitativo de contaminacion
  const getAQI = (value, ranges) => {
    let aqi = 0;
    for (let i = 0; i < ranges.length; i++) {
      if (value > ranges[i]){
        aqi += 1;
      }
    }
    return aqi + 1;
  }
  //calcular el indice de cualitativo para cada contaminante
  const qualitativeIndices ={
    so2: getAQI(components.so2, ranges.so2),
    no2: getAQI(components.no2, ranges.no2),
    pm10: getAQI(components.pm10, ranges.pm10),
    pm2_5: getAQI(components.pm2_5, ranges.pm2_5),
    o3: getAQI(components.o3, ranges.o3),
    co: getAQI(components.co, ranges.co)
  }

  return (
    <div className="bg-white rounded shadow overflow-hidden max-w-2xl mx-auto">
      <div className={`p-4 ${getAQIBg(main.aqi)} flex justify-between`}>
        <div className='text-white'>
            <h2>Índice de la Calidad del Aire</h2>
            <p className='text-4xl font-bold'>{getAQICategory(main.aqi)}</p>
            <p></p>
            <p className='bg-white p-2 m-2 text-black rounded-sm w-fit '>
              {average.toFixed(2)} µg/m³
            </p>
        </div>
        <div>
          {getAQIIcon(main.aqi)}
          
        </div>
      </div>
      <div className='p-4 pt-0'>
      <p className='text-[10px] text-end'>Última Actualización:  {time} {date}</p>
        <p className='font-bold text-blue-500'>RESUMEN: </p>
        <p>¿Cuál es la calidad del aire actual en Trinidad?</p>
        <table className='min-w-full border border-gray-300 mt-3'>
          <thead className='bg-gray-50'>
              <tr>
                <th className='border border-gray-300'>Nivel de contaminación del Aire</th>
                <th className='border border-gray-300'>Contaminate Principal</th>
              </tr>
            </thead>
          <tbody>
            <tr className='text-center'>
              <td className='border border-gray-300'>{getAQICategory(main.aqi)}</td>
              <td className='border border-gray-300 uppercase'>
                {Object.keys(qualitativeIndices).reduce((a, b) => qualitativeIndices[a] > qualitativeIndices[b] ? a : b)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='p-4 pt-0'>
            {
              Object.keys(qualitativeIndices).map((key) => (
                <div className={` border border-gray-300 flex justify-between my-2`}> 
                  <div className={`font-bold text-center p-4 w-1/2 sm:w-1/3 text-white ${getAQIBg(qualitativeIndices[key])} `}>
                    <p className='uppercase'>{key}</p>
                    <p className='text-xl'>{getAQICategory(qualitativeIndices[key])}</p>
                  </div>
                  <div className='w-1/3 p-2 m-2 text-gray-500 rounded-sm flex justify-center items-center'>
                    {components[key].toFixed(2)} µg/m³
                  </div>
                </div>
              ))
            }
      </div>
    </div>
  );
};

export default AirQuality;