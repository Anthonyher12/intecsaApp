// Datos de ejemplo para la tabla de inventario
let inventario = [
    { ID: 1, NOMBRE: "Producto 1", CODIGO: "ABC123", MARCA: "Marca A", CANTIDAD: 10, ESTANTE: "A1" },
    { ID: 2, NOMBRE: "Producto 2", CODIGO: "DEF456", MARCA: "Marca B", CANTIDAD: 20, ESTANTE: "B2" }
];

// Función para generar la tabla de inventario
function generarTabla() {
    const tabla = document.getElementById('tabla-inventario');
    tabla.innerHTML = ''; // Limpiar la tabla antes de generarla nuevamente

    // Crear la fila de encabezado
    let encabezado = '<tr>';
    for (let campo in inventario[0]) {
        encabezado += `<th>${campo}</th>`;
    }
    encabezado += '</tr>';
    tabla.innerHTML += encabezado;

    // Crear las filas de datos
    inventario.forEach((item, index) => {
        let fila = '<tr>';
        for (let campo in item) {
            fila += `<td contenteditable="true" oninput="actualizarDato(${index}, '${campo}', this.innerText)">${item[campo]}</td>`;
        }
        fila += '</tr>';
        tabla.innerHTML += fila;
    });
}

// Función para agregar una fila nueva
function agregarFila() {
    const nuevoID = inventario.length + 1;
    const nuevaFila = { ID: nuevoID };
    Object.keys(inventario[0]).forEach(key => {
        if (key !== 'ID') {
            nuevaFila[key] = ""; // Asigna un valor inicial vacío para otras columnas
        }
    });
    inventario.push(nuevaFila);
    generarTabla();
}

// Función para agregar una columna nueva
function agregarColumna() {
    const nombreColumna = prompt("Ingrese el nombre de la nueva columna:");
    if (nombreColumna) {
        inventario.forEach(item => {
            item[nombreColumna] = ""; // Asigna un valor inicial vacío
        });
        generarTabla(); // Regenerar la tabla para reflejar la nueva columna
    }
}

// Función para actualizar un dato en el inventario
function actualizarDato(indice, campo, valor) {
    inventario[indice][campo] = valor;
}

// Función para exportar los datos del inventario a un archivo Excel (formato CSV)
function exportarExcel() {
    let csv = Object.keys(inventario[0]).join(',') + '\n'; // Encabezados
    inventario.forEach(item => {
        csv += Object.values(item).join(',') + '\n'; // Datos
    });

    // Crear un objeto Blob y descargar el archivo CSV
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement('a');
    if (link.download !== undefined) {
        let url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'inventario.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Generar la tabla al cargar la página
window.onload = generarTabla;
