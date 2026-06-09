// Base de datos de inventario estructurada con 15 inmuebles iniciales (5 por categoría)
const datosIniciales = [
    // --- 5 Terrenos ---
    { id: "t1", tipo: "terreno", titulo: "Terreno Industrial Las Praderas", precio: "$120,000", ubicacion: "Villa el Salvador, Lima Sur", imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" },
    { id: "t2", tipo: "terreno", titulo: "Lote Residencial El Mirador", precio: "$65,000", ubicacion: "Lurín, Lima Sur", imagen: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=600&q=80" },
    { id: "t3", tipo: "terreno", titulo: "Terreno Agrícola de Inversión", precio: "$85,000", ubicacion: "Panamericana Sur, Ica", imagen: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80" },
    { id: "t4", tipo: "terreno", titulo: "Macrolote Urbano Premium", precio: "$310,000", ubicacion: "Pachacámac, Lima", imagen: "https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=600&q=80" },
    { id: "t5", tipo: "terreno", titulo: "Terreno Comercial Estratégico", precio: "$195,000", ubicacion: "Villa María del Triunfo, Lima Sur", imagen: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80" },

    // --- 5 Departamentos ---
    { id: "d1", tipo: "apartamento", titulo: "Flat de Estilo San Isidro", precio: "S/. 3,200 / mes", ubicacion: "San Isidro, Lima", imagen: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80" },
    { id: "d2", tipo: "apartamento", titulo: "Penthouse Premium con Balcón", precio: "$1,100 / mes", ubicacion: "Miraflores, Lima Metropolitana", imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" },
    { id: "d3", tipo: "apartamento", titulo: "Departamento Familiar Vista Parque", precio: "S/. 2,400 / mes", ubicacion: "Santiago de Surco, Lima", imagen: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80" },
    { id: "d4", tipo: "apartamento", titulo: "Moderno Apto Ejecutivo", precio: "S/. 1,900 / mes", ubicacion: "Chorrillos, Lima", imagen: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80" },
    { id: "d5", tipo: "apartamento", titulo: "Departamento Acogedor de Estreno", precio: "S/. 1,500 / mes", ubicacion: "Villa el Salvador, Lima", imagen: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },

    // --- 5 Locales Comerciales ---
    { id: "l1", tipo: "local", titulo: "Local Comercial Esquina Avenida", precio: "$1,500 / mes", ubicacion: "Av. Velasco Alvarado, VES", imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
    { id: "l2", tipo: "local", titulo: "Módulo para Entidades o Tiendas", precio: "$900 / mes", ubicacion: "Centro Cívico, Lima Centro", imagen: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
    { id: "l3", tipo: "local", titulo: "Local para Restaurant o Franquicias", precio: "$2,200 / mes", ubicacion: "Zona Comercial, Ica", imagen: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" },
    { id: "l4", tipo: "local", titulo: "Oficina / Local Administrativo", precio: "$750 / mes", ubicacion: "San Borja, Lima", imagen: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80" },
    { id: "l5", tipo: "local", titulo: "Almacén / Local Comercial Amplio", precio: "$1,800 / mes", ubicacion: "Av. Pachacútec, VMT", imagen: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80" }
];

let propiedades = JSON.parse(localStorage.getItem('medrano_exclusivo_db')) || datosIniciales;
let adminAutenticado = false;

function salvarDatos() {
    localStorage.setItem('medrano_exclusivo_db', JSON.stringify(propiedades));
}

// Inyección Dinámica Separada
function distribuirPropiedades() {
    const contenedorTerrenos = document.getElementById('contenedor-terrenos');
    const contenedorDepartamentos = document.getElementById('contenedor-departamentos');
    const contenedorLocales = document.getElementById('contenedor-locales');

    contenedorTerrenos.innerHTML = '';
    contenedorDepartamentos.innerHTML = '';
    contenedorLocales.innerHTML = '';

    const listaTerrenos = propiedades.filter(p => p.tipo === 'terreno');
    const listaDepartamentos = propiedades.filter(p => p.tipo === 'apartamento');
    const listaLocales = propiedades.filter(p => p.tipo === 'local');

    listaTerrenos.forEach(p => contenedorTerrenos.appendChild(crearTarjetaInmueble(p, 'VENTA DE TERRENO')));
    listaDepartamentos.forEach(p => contenedorDepartamentos.appendChild(crearTarjetaInmueble(p, 'ALQUILER DPTO')));
    listaLocales.forEach(p => contenedorLocales.appendChild(crearTarjetaInmueble(p, 'LOCAL COMERCIAL')));
}

// Generador de Tarjeta con Botón de WhatsApp integrado y Captura de Clic
function crearTarjetaInmueble(p, badgeText) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    
    // Capturar el clic en la tarjeta (excepto si hace clic en el botón de WhatsApp o botones admin)
    tarjeta.onclick = (e) => {
        if (!e.target.closest('.whatsapp-float-badge') && !e.target.closest('.admin-actions')) {
            abrirModal(p.titulo);
        }
    };

    // Mensaje personalizado para WhatsApp según el inmueble
    const mensajeWs = encodeURIComponent(`Hola Medrano Firma Inmobiliaria, deseo más información sobre el inmueble: ${p.titulo} (${p.ubicacion})`);
    const linkWhatsapp = `https://wa.me/51982716628?text=${mensajeWs}`;

    tarjeta.innerHTML = `
        <span class="tarjeta-badge">${badgeText}</span>
        <div class="tarjeta-img-container">
            <img src="${p.imagen}" alt="${p.titulo}" class="tarjeta-img" onerror="this.src='https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'">
            <a href="${linkWhatsapp}" target="_blank" class="whatsapp-float-badge" title="Preguntar por WhatsApp">
                <i class="fab fa-whatsapp"></i>
            </a>
        </div>
        <div class="tarjeta-info">
            <h3>${p.titulo}</h3>
            <div class="tarjeta-lugar"><i class="material-icons" style="font-size:16px; color:var(--oro-principal)">location_on</i> ${p.ubicacion}</div>
            <div class="tarjeta-precio">${p.precio}</div>
            
            <div class="admin-actions ${adminAutenticado ? '' : 'hidden'}">
                <button class="btn-edit" onclick="prepararEdicion('${p.id}')">Editar</button>
                <button class="btn-delete" onclick="eliminarInmueble('${p.id}')">Eliminar</button>
            </div>
        </div>
    `;
    return tarjeta;
}

// CONTROL DE SEGURIDAD - AUTENTICACIÓN
function autenticarAdmin() {
    if (adminAutenticado) {
        document.getElementById('admin-panel').scrollIntoView();
        return;
    }
    
    const clave = prompt("Ingrese la contraseña de seguridad de Medrano Inmobiliaria:");
    // Contraseña asignada: Medrano2026
    if (clave === "Medrano2026") {
        adminAutenticado = true;
        document.getElementById('admin-panel').classList.remove('hidden');
        document.getElementById('btn-admin-toggle').textContent = "Gestión Activa";
        document.getElementById('btn-admin-toggle').style.background = "#2e7d32";
        document.getElementById('btn-admin-toggle').style.color = "#fff";
        distribuirPropiedades();
        document.getElementById('admin-panel').scrollIntoView();
    } else if (clave !== null) {
        alert("Contraseña incorrecta. Acceso denegado.");
    }
}

function cerrarSesionAdmin() {
    adminAutenticado = false;
    document.getElementById('admin-panel').classWith = 'hidden';
    document.getElementById('admin-panel').classList.add('hidden');
    document.getElementById('btn-admin-toggle').textContent = "Acceso Interno";
    document.getElementById('btn-admin-toggle').style.background = "linear-gradient(135deg, var(--oro-principal), var(--oro-profundo))";
    document.getElementById('btn-admin-toggle').style.color = "#000";
    limpiarFormulario();
    distribuirPropiedades();
}

// GESTIÓN DE MODAL / LEADS
function abrirModal(tituloPropiedad) {
    document.getElementById('modal-propiedad-titulo').textContent = tituloPropiedad;
    document.getElementById('modal-lead').classList.remove('hidden');
}

function cerrarModal() {
    document.getElementById('modal-lead').classList.add('hidden');
    document.getElementById('form-cliente').reset();
}

function enviarLead(event) {
    event.preventDefault();
    const propiedad = document.getElementById('modal-propiedad-titulo').textContent;
    const nombre = document.getElementById('lead-nombre').value;
    const email = document.getElementById('lead-email').value;
    const telefono = document.getElementById('lead-telefono').value;

    alert(`¡Gracias ${nombre}! Hemos registrado tu solicitud para el proyecto:\n"${propiedad}"\nUn asesor legal y comercial de Medrano se contactará al número ${telefono} en la brevedad.`);
    cerrarModal();
}

// CRUD INVENTARIO
function guardarPropiedad(event) {
    event.preventDefault();
    const id = document.getElementById('propiedad-id').value;
    const tipo = document.getElementById('tipo').value;
    const titulo = document.getElementById('titulo').value;
    const precio = document.getElementById('precio').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const imagen = document.getElementById('imagen').value;

    if (id) {
        const index = propiedades.findIndex(p => p.id === id);
        if (index !== -1) propiedades[index] = { id, tipo, titulo, precio, ubicacion, imagen };
    } else {
        const nuevo = { id: "id_" + Date.now(), tipo, titulo, precio, ubicacion, imagen };
        propiedades.push(nuevo);
    }

    salvarDatos();
    distribuirPropiedades();
    limpiarFormulario();
}

function prepararEdicion(id) {
    const p = propiedades.find(p => p.id === id);
    if (p) {
        document.getElementById('propiedad-id').value = p.id;
        document.getElementById('tipo').value = p.tipo;
        document.getElementById('titulo').value = p.titulo;
        document.getElementById('precio').value = p.precio;
        document.getElementById('ubicacion').value = p.ubicacion;
        document.getElementById('imagen').value = p.imagen;
        document.getElementById('btn-form-submit').textContent = "Guardar Cambios";
        document.getElementById('admin-panel').scrollIntoView();
    }
}

function eliminarInmueble(id) {
    if (confirm("¿Estás seguro de que deseas retirar esta propiedad del portafolio comercial?")) {
        propiedades = propiedades.filter(p => p.id !== id);
        salvarDatos();
        distribuirPropiedades();
    }
}

function limpiarFormulario() {
    document.getElementById('propiedad-form').reset();
    document.getElementById('propiedad-id').value = '';
    document.getElementById('btn-form-submit').textContent = "Publicar Inmueble";
}

window.onload = () => {
    distribuirPropiedades();
};