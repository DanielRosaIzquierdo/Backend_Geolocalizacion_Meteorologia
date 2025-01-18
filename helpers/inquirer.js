const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: '2',
                name: `${'2.'.green} Historial`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];


const inquirerMenu = async () => {


    console.clear();
    console.log('=============================='.green);
    console.log('   Seleccione una opción'.white);
    console.log('==============================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const selectCity = async (cities) => {
    const choices = cities.map((city, i) => {
        const index = `${i + 1}`.green;
        return {
            value: city.id,
            name: `${index}. ${city.place_name}`,
        }
    })

    choices.unshift({
        value: '0',
        name: `${'0'.green}. Cancelar`
    })

    const cityQuestions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices: choices
        }
    ]

    const { id } = await inquirer.prompt(cityQuestions);
    return id;
}

const selectCityHistory = async (cities) => {
    const choices = cities.map((city, i) => {
        const index = `${i + 1}`.green;
        return {
            value: city.id,
            name: `${index}. ${city.city}`,
        }
    })

    const cityQuestions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices: choices
        }
    ]

    const { id } = await inquirer.prompt(cityQuestions);
    return id;
}

const pause = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor introduzca un valor'.red;

                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    selectCity,
    selectCityHistory
}
