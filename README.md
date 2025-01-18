# Aplicación de consola para geolocalización y meteorología: Clima en Tiempo Real

Aplicación de consola que integra dos APIs: una de geolocalización y otra de meteorología. Permite al usuario obtener información sobre el clima de una ciudad específica a partir de su nombre o ubicación. Se utiliza la librería [Inquirer](https://www.npmjs.com/package/inquirer) para una interfaz de usuario interactiva, que guía al usuario a través del proceso de consulta de datos en la consola.

Además, la aplicación guarda un historial de las búsquedas realizadas en un archivo JSON, permitiendo al usuario revisar consultas pasadas.

## Características

- **Búsqueda por nombre de ciudad**: Obtén el clima de una ciudad proporcionando su nombre.
- **Geolocalización automática**: Obtén el clima basado en tu ubicación actual.
- **Interfaz interactiva**: Utiliza Inquirer para facilitar la navegación a través de la consola.
- **Persistencia de historial**: Guarda las búsquedas realizadas en un archivo JSON, permitiendo al usuario revisar las consultas previas.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/DanielRosaIzquierdo/Backend_Geolocalizacion_Meteorologia.git
   
