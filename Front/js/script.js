// Obtenemos los parámetros enviados en la URL por el servidor
const parametros = new URLSearchParams(window.location.search);

// Leemos cada parámetro individual usando .get()
const cliente = parametros.get('cliente');
const correo = parametros.get('correo');
const producto = parametros.get('producto');
const cantidad = parametros.get('cantidad');
const tamano = parametros.get('tamano');
const llevar = parametros.get('llevar');
const observaciones = parametros.get('observaciones');

// Asignamos la información a los elementos del documento HTML
if (document.getElementById('cliente')) {
    document.getElementById('cliente').textContent = cliente || 'No especificado';
}

if (document.getElementById('correo')) {
    document.getElementById('correo').textContent = correo || 'No proporcionado';
}

if (document.getElementById('producto')) {
    document.getElementById('producto').textContent = producto || 'No seleccionado';
}

if (document.getElementById('cantidad')) {
    document.getElementById('cantidad').textContent = cantidad || '1';
}

if (document.getElementById('tamano')) {
    document.getElementById('tamano').textContent = tamano || 'Mediano';
}

if (document.getElementById('llevar')) {
    document.getElementById('llevar').textContent = llevar || 'No';
}

if (document.getElementById('observaciones')) {
    document.getElementById('observaciones').textContent = observaciones || 'Sin observaciones';
}
