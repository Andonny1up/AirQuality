import { useState } from 'react';
import {
  GoodIcon,
  ModerateIcon,
  UnhealthySensitiveIcon,
  UnhealthyIcon,
  HazardousIcon
} from './airQualityIcons.jsx';

const AirQualityList = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Índice del carrusel
  const itemsPerPage = 5; // Número de elementos visibles a la vez

  const handleNext = () => {
    if (currentIndex + itemsPerPage < data.list.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    // Mapeo de días de la semana en inglés a español
    const diasSemana = {
      'Sunday': 'Domingo',
      'Monday': 'Lunes',
      'Tuesday': 'Martes',
      'Wednesday': 'Miércoles',
      'Thursday': 'Jueves',
      'Friday': 'Viernes',
      'Saturday': 'Sábado'
    };

    // Obtener el día de la semana en inglés
    const diaSemanaIngles = date.toLocaleString('en-US', { weekday: 'long' });

    // Convertir el día de la semana al español
    const diaSemanaEspanol = diasSemana[diaSemanaIngles];

    // Formatear la fecha y la hora en español
    const fecha = date.toLocaleDateString('es-ES');
    const hora = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    return {
        day: diaSemanaEspanol,
        date: fecha,
        time: hora
      };
  };
  //--------- herlpers -------
  const getAQIBg= (aqi) => {
    if (aqi === 1) return 'bg-green-500';
    if (aqi === 2) return 'bg-yellow-500';
    if (aqi === 3) return 'bg-orange-700';
    if (aqi === 4) return 'bg-red-600';
    if (aqi === 5) return 'bg-purple-950';
  };

  const getAQICategory = (aqi) => {
    if (aqi === 1) return 'Bueno';
    if (aqi === 2) return 'Moderado';
    if (aqi === 3) return 'Perjudicial para grupos sensibles';
    if (aqi === 4) return 'Perjudicial';
    if (aqi === 5) return 'Peligroso';
  };

  const getAQIIcon = (aqi) => {
    if (aqi === 1) return <GoodIcon className='w-20 text-white' />;
    if (aqi === 2) return <ModerateIcon className='w-20 text-white' />;
    if (aqi === 3) return <UnhealthySensitiveIcon className='w-20 text-white' />;
    if (aqi === 4) return <UnhealthyIcon className='w-20 text-white' />;
    if (aqi === 5) return <HazardousIcon className='w-20 text-white'/>;
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-5 uppercase text-center">Calidad del Aire Previsto Para las Proximas Horas</h1>
      <ul>
        {data.list.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => {
          const { day, date, time } = formatDate(item.dt);
          return (
            <li key={index} className={`${getAQIBg(item.main.aqi)} mb-3 p-4 border-b border-gray-300 py-2 rounded-lg`}>
              <div className='flex justify-between'>
                <div className='text-white font-bold text-center p-4'>
                    <p className='uppercase'>{day}</p>
                    <p>Fecha: {date}</p>
                    <p className='text-2xl'>{time}</p>
                </div>
                <div className='flex justify-center items-center text-white font-bold'>
                  {getAQICategory(item.main.aqi)}
                </div>
                <div>
                    { getAQIIcon(item.main.aqi) }
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentIndex + itemsPerPage >= data.list.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AirQualityList;