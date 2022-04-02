let archivoTareas = require('./funcionesDeTareas');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello to my site!')
    }
);

app.listen(3000, () => 
    console.log('Server running!')
);



//Si desea investigar un poco más sobre este módulo nativo de NodeJs
//https://nodejs-es.github.io/api/process.html#process_es_process 
let accion = process.argv[2];

switch(accion) {
    case 'listar':
        console.log('Listado de tareas');
        console.log('------------------');
        archivoTareas.listarTareas();
        console.log()
        break;

    case 'crear':
        console.log('Creando la tarea');
        const nombreTarea = process.argv[3];
        //console.log(nombreTarea, typeof(nombreTarea), Boolean(undefined));
        if (!nombreTarea) {//si no es falso
            console.log('No se escribio el nombre de la Tarea');
            break;
        } 
        const nuevaTarea = {"titulo": nombreTarea, "estado": "pendiente"}
        
        console.log('Tarea guardada con exito');
        break;

    case 'filtrar':
        const nombreEstado = process.argv[3];
        if (!nombreEstado) {//si no es falso
            console.log('No se escribio el nombre del estado para usar el filtro');
            break;
        }
        console.log('Filtrando las tareas con el estado: ', nombreEstado);
        archivoTareas.filtrarPorEstado(nombreEstado);
        const listaTareasFiltradas = archivoTareas.guardarTarea(nombreEstado);
        archivoTareas.listarTareas(listaTareasFiltradas);
        console.log('Tareas filtradas por el estado; ', nombreEstado);
        break;

    case undefined:
        console.log();    
        console.log('Atención - Tienes que pasarme una acción');
        console.log('Las acciones disponibles son: listar');
        console.log('----------------------------------------');
        break;

    default:
        console.log('------------------------------------');
        console.log('No entiendo qué quieres hacer');
        console.log('Las acciones disponibles son: listar');
        console.log('------------------------------------');
        break;
}
