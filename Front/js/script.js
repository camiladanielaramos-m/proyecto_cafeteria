// Obtenemos los parámetros enviados en la URL por el servidor
const parametros = new URLSearchParams(window.location.search);

// Leemos cada parámetro individual usando .get()
const cliente = parametros.get('cliente') || '';
const correo = parametros.get('correo') || '';
const producto = parametros.get('producto') || '';
const cantidad = parametros.get('cantidad') || '1';
const tamano = parametros.get('tamano') || 'Mediano';
const llevar = parametros.get('llevar') || 'No';
const observaciones = parametros.get('observaciones') || 'Ninguna';

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
    document.getElementById('cantidad').textContent = cantidad;
}

if (document.getElementById('tamano')) {
    document.getElementById('tamano').textContent = tamano;
}

if (document.getElementById('llevar')) {
    document.getElementById('llevar').textContent = llevar;
}

if (document.getElementById('observaciones')) {
    document.getElementById('observaciones').textContent = observaciones;
}

// LÓGICA DE CONFIRMACIÓN: Al confirmar, se realiza la inserción en la base de datos (MVC)
const btnConfirmar = document.getElementById('btnConfirmar');

if (btnConfirmar) {
    btnConfirmar.addEventListener('click', async () => {
        // Validación en cliente antes de enviar
        if (!cliente.trim() || !producto.trim()) {
            alert('No hay información suficiente para registrar el pedido.');
            return;
        }

        // Estado visual del botón durante la petición
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = '⏳ Guardando en base de datos...';

        const bannerInfo = document.getElementById('bannerInfo');
        const bannerExito = document.getElementById('bannerExito');
        const bannerError = document.getElementById('bannerError');
        const mensajeError = document.getElementById('mensajeError');
        const folioPedido = document.getElementById('folioPedido');
        const grupoAccionesConfirmar = document.getElementById('grupoAccionesConfirmar');
        const grupoAccionesFinal = document.getElementById('grupoAccionesFinal');

        try {
            // Petición POST al backend para insertar en MySQL respetando el patrón MVC
            const respuesta = await fetch('/confirmar-pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cliente: cliente,
                    correo: correo,
                    producto: producto,
                    cantidad: parseInt(cantidad, 10),
                    tamano: tamano,
                    llevar: llevar,
                    observaciones: observaciones
                })
            });

            const resultado = await respuesta.json();

            if (resultado.success) {
                // Ocultar banner informativo y mostrar banner de éxito con el ID generado
                if (bannerInfo) bannerInfo.style.display = 'none';
                if (bannerError) bannerError.style.display = 'none';
                if (bannerExito) bannerExito.style.display = 'flex';
                if (folioPedido) folioPedido.textContent = `#${resultado.id}`;

                // Ocultar botones de confirmación y mostrar botón de nuevo pedido
                if (grupoAccionesConfirmar) grupoAccionesConfirmar.style.display = 'none';
                if (grupoAccionesFinal) grupoAccionesFinal.style.display = 'flex';
            } else {
                throw new Error(resultado.mensaje || 'Error al guardar el pedido en la base de datos.');
            }
        } catch (error) {
            btnConfirmar.disabled = false;
            btnConfirmar.textContent = '💾 Confirmar y Guardar Pedido';
            if (bannerError) {
                bannerError.style.display = 'flex';
                if (mensajeError) {
                    mensajeError.textContent = `${error.message} (Verifica que MySQL esté activo en XAMPP).`;
                }
            }
        }
    });
}
