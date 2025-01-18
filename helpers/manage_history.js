const fs = require('fs');

const route = './database/history.json';


const saveHistory = (data) => {
    fs.writeFileSync(route, JSON.stringify(data));
}

const readHistory = () => {
    if (!fs.existsSync(route)) {
        console.log('Ruta incorrecta a la base de datos')
        return null;
    }

    const info = fs.readFileSync(route, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;
}

module.exports = {
    saveHistory,
    readHistory,
}