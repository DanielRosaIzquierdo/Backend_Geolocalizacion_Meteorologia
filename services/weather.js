const { default: axios } = require("axios");

const urlBase = 'url_base_de_openweather';
const apiKey = 'tu_api_key';

const getWeather = async (coordinates) => {
    let lon = coordinates[0];
    let lat = coordinates[1];
    try {
        const response = await axios.get(`${urlBase}?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${apiKey}`)
        return (response.status === 200) ? response.data : null;
    } catch (error) {
        console.log('Error al obtener las coordenadas: ' + error.message)
        return null;
    }
}

module.exports = {
    getWeather
}