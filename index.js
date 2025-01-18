const { inquirerMenu, readInput, pause, selectCity, selectCityHistory } = require("./helpers/inquirer");
const { getCities } = require("./services/location");
const { getWeather } = require("./services/weather");
const { saveHistory, readHistory } = require("./helpers/manage_history")

main = async () => {
    let opt = '';

    let searches = readHistory();

    let citiesArray = [];

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case '1':
                const city = await readInput('Ciudad: ');

                citiesArray = await getCities(city);

                if (citiesArray !== null) {
                    let idSelectedCity = await selectCity(citiesArray);

                    if (idSelectedCity !== '0') {

                        let city = searchCitybyId(citiesArray, idSelectedCity);

                        let coordinates = getCoordinates(city);

                        let weather = await getWeather(coordinates);

                        if (weather !== null) {
                            let search = createSearch(city, coordinates, weather);

                            searches.unshift(search);

                            showWeather(search);
                        } else {
                            console.log('No se ha podido obtener la información meteorológica')
                        }
                    }

                } else {
                    console.log('No se han encontrado ciudades')
                }

                break;

            case '2':
                if (searches.length !== 0) {
                    let idCityHistory = await selectCityHistory(searches);

                    await showCityHistoryById(idCityHistory, searches);
                } else {
                    console.log('No hay ciudades en el historial aún')
                }



                break;

            default:
        }

        if (searches.length > 5) {
            searches = searches.slice(0, 5)
        }
        saveHistory(searches);
        await pause();
    } while (opt !== '0');
}

const searchCitybyId = (cities, cityId) => {
    return cities.find((city) => cityId === city.id)
}

const getCoordinates = (city) => {
    return city.geometry['coordinates'];
}

const createSearch = (city, coordinates, weather) => {

    return {
        'id': city.id,
        'city': city.place_name || city.city,
        'lat': String(coordinates[1]),
        'lon': String(coordinates[0]),
        'temp': String(weather.main.temp),
        'temp_min': String(weather.main.temp_min),
        'temp_max': String(weather.main.temp_max),
        'weather': weather.weather[0].description
    }
}

const showWeather = (search) => {

    console.log();
    console.log('Información de la ciudad'.green);
    console.log();
    console.log(`Ciudad: ${search.city.green}`);
    console.log(`Lat: ${search.lat.yellow}`);
    console.log(`Lng: ${search.lon.yellow}`);
    console.log(`Temperatura: ${search.temp.yellow}`);
    console.log(`Mínima: ${search.temp_min.yellow}`);
    console.log(`Máxima: ${search.temp_max.yellow}`);
    console.log(`Cómo está el clima: ${search.weather.green}`);

    return search;
}


const showCityHistoryById = async (id, searches) => {
    let searchedCity = searches.find((city) => city.id === id);

    let weather = await getWeather([searchedCity.lon, searchedCity.lat]);

    if (weather !== null) {

        let search = createSearch(searchedCity, [searchedCity.lon, searchedCity.lat], weather);


        searches.unshift(search);


        showWeather(search);
    } else {
        console.log('No se ha podido obtener la información meteorológica')
    }

}



main();