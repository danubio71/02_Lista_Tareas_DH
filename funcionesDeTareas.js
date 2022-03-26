const fs = require('fs');

let archivoTareas = {
    archivo: 'tareas.json',
    leerArchivo: function () {
        return JSON.parse(fs.readFileSync(this.archivo, 'utf-8'));
    },
    listarTareas: function(listaDeTareas){
        let tareas = listaDeTareas;
        if (!listaDeTareas) {
            tareas = this.leerArchivo()
        }
        //let tareas = this.leerArchivo();
        if (!listaDeTareas.length) {
            console.log('No se encontraron tareas');
            return
        }
        tareas.forEach((tarea, indice) => {
            console.log((indice + 1)  +'. ' + tarea.titulo + ' - ' + tarea.estado)
        });
    },
    //Escribir json - 
    escribirJSON: function(listaDeTareas){
        const tareasJSON = JSON.stringify(listaDeTareas);
        fs.writeFileSync(this.archivo, tareasJSON);
    },
    guardarTarea: function(tarea){
        const tareasActuales = this.leerArchivo();
        tareasActuales.push(tarea);
        this.escribirJSON(tareasActuales);
    },
    filtrarPorEstado: function(estado){
        const listaDeTareas =  this.leerArchivo();
        const tareasFiltradas = listaDeTareas.filter(function(tarea){
            return tarea.estado === estado;
        })
        return tareasFiltradas;
    }
}
module.exports = archivoTareas;