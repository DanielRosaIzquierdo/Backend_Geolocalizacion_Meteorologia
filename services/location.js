const { default: axios } = require("axios");

const urlBase = 'url_base_de_maptiler';
const apiKey = 'tu_api_key';

const getCities = async (city) => {

  try {
    const response = await axios.get(`${urlBase}${city}.json?language=es&key=${apiKey}`)
    return (response.data['features'].length === 0) ? null : response.data['features'];
  } catch (error) {
    console.log('Error al obtener las coordenadas: ' + error.message)
    return null;
  }

}

module.exports = {
  getCities
}
