export default fetchData = async (param, city) => {
  const apiKey = 'e9a5d3b74bf84418b11193028231901';
  const query = `http://api.weatherapi.com/v1/${param}.json?key=${apiKey}&q=${city}`;

  const response = await fetch(query);

  return response.json();
};
