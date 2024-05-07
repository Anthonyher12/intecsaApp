// Datos de ejemplo para la tabla de inventario
let inventario = [
    { ID: 1, NOMBRE: "Producto 1", CODIGO: "ABC123", MARCA: "Marca A", CANTIDAD: 10, ESTANTE: "A1" },
    { ID: 2, NOMBRE: "Producto 2", CODIGO: "DEF456", MARCA: "Marca B", CANTIDAD: 20, ESTANTE: "B2" }
];

// Función para generar la tabla de inventario
function generarTabla() {
    const tabla = document.getElementById('tabla-inventario');
    tabla.innerHTML = '';  // Limpiar la tabla antes de generarla nuevamente

    // Crear la fila de encabezado
    let encabezado = '<tr>';
    if (inventario.length > 0) {
        for (let campo in inventario[0]) {
            encabezado += `<th>${campo}</th>`;
        }
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
    const nuevoProducto = { ID: nuevoID, NOMBRE: "Nuevo Producto", CODIGO: "", MARCA: "", CANTIDAD: 0, ESTANTE: "" };
    inventario.push(nuevoProducto);
    generarTabla();
}

// Función para agregar una columna nueva
function agregarColumna() {
    const nuevaColumna = prompt("Ingrese el nombre de la nueva columna:");
    if (nuevaColumna) {
        inventario.forEach(item => {
            item[nuevaColumna.toUpperCase()] = "";  // Añadir la nueva columna con valor vacío
        });
        generarTabla();
    }
}

// Función para actualizar un dato en el inventario
function actualizarDato(indice, campo, valor) {
    inventario[indice][campo] = valor;
}

// Función para exportar los datos del inventario a un archivo Excel (formato XLS)
function exportarExcel() {
    let dataStr = 'data:application/vnd.ms-excel,' + encodeURIComponent(generarCSV());
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "inventario.xls");
    document.body.appendChild(downloadAnchorNode); // Required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Función para generar CSV para la exportación
function generarCSV() {
    let csv = '';
    if (inventario.length > 0) {
        for (let campo in inventario[0]) {
            csv += `${campo},`;
        }
        csv = csv.slice(0, -1) + '\n'; // Eliminar la última coma y agregar salto de línea
    }

    inventario.forEach(item => {
        for (let campo in item) {
            csv += `${item[campo]},`;
        }
        csv = csv.slice(0, -1) + '\n'; // Eliminar la última coma y agregar salto de línea
    });

    return csv;
}

// Generar la tabla al cargar la página
window.onload = generarTabla;

