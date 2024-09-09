import fetch from 'node-fetch';

const fetchStates = async () => {
  const response = await fetch('http://api.airvisual.com/v2/states?country=Bolivia&key={{apikey}}');
  const result = await response.json();
  console.log(result.data);
};

fetchStates();