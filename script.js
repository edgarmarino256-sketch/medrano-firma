// ======================================
// MEDRANO FIRMA INMOBILIARIA PREMIUM
// PANEL ADMINISTRADOR
// ======================================

const PASSWORD_ADMIN = "firma1999";
let adminActivo = false;

// ======================================
// BASE DE DATOS INICIAL
// ======================================
let propiedades = JSON.parse(localStorage.getItem("medrano_propiedades")) || [
    {
        id: 1,
        tipo: "terreno",
        titulo: "Terreno Comercial Premium",
        precio: "US$ 220,000",
        ubicacion: "Lurín",
        imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        tipo: "terreno",
        titulo: "Lote Residencial Vista Valle",
        precio: "US$ 95,000",
        ubicacion: "Cieneguilla",
        imagen: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        tipo: "terreno",
        titulo: "Terreno Industrial",
        precio: "US$ 350,000",
        ubicacion: "Villa El Salvador",
        imagen: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        tipo: "vivienda",
        titulo: "Casa Moderna Premium",
        precio: "US$ 480,000",
        ubicacion: "Miraflores",
        imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 5,
        tipo: "vivienda",
        titulo: "Residencia Familiar",
        precio: "US$ 390,000",
        ubicacion: "La Molina",
        imagen: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 6,
        tipo: "vivienda",
        titulo: "Casa de Lujo",
        precio: "US$ 620,000",
        ubicacion: "San Isidro",
        imagen: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 7,
        tipo: "comercial",
        titulo: "Centro Empresarial",
        precio: "US$ 3,500 / mes",
        ubicacion: "San Isidro",
        imagen: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 8,
        tipo: "comercial",
        titulo: "Local Comercial Premium",
        precio: "US$ 2,800 / mes",
        ubicacion: "Miraflores",
        imagen: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 9,
        tipo: "comercial",
        titulo: "Oficina Corporativa",
        precio: "US$ 5,000 / mes",
        ubicacion: "Surco",
        imagen: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80"
    }
];

// ======================================
// GUARDAR DATOS LOCALSTORAGE
// ======================================
function guardarDatos() {
    localStorage.setItem("medrano_propiedades", JSON.stringify(propiedades));
}

// ======================================
// LOGIN & MODAL ADMIN
// ======================================
function abrirLogin() {
    const modal = document.getElementById("loginModal");
    if (modal) modal.classList.remove("hidden");
}

function cerrarModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.classList.add("hidden");
        document.getElementById("adminPassword").value = "";
        const loginError = document.getElementById("loginError");
        if (loginError) loginError.classList.add("hidden");
    }
}

function loginAdmin() {
    const pass = document.getElementById("adminPassword").value;
    const loginError = document.getElementById("loginError");

    if (pass === PASSWORD_ADMIN) {
        adminActivo = true;
        cerrarModal();

        const panel = document.getElementById("panelAdmin");
        if (panel) {
            panel.classList.remove("hidden");
            panel.scrollIntoView({ behavior: "smooth" });
        }
        mostrarPropiedades();
    } else {
        if (loginError) {
            loginError.classList.remove("hidden");
        } else {
            alert("Contraseña incorrecta");
        }
    }
}

function cerrarSesion() {
    adminActivo = false;
    const panel = document.getElementById("panelAdmin");
    if (panel) panel.classList.add("hidden");
    mostrarPropiedades();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ======================================
// CREAR TARJETA (Sincronizado con CSS)
// ======================================
function crearTarjeta(propiedad) {
    const card = document.createElement("div");
    card.className = "property-card";

    const tituloLimpio = propiedad.titulo.replace(/'/g, "\\'");
    const tipoBadge = propiedad.tipo === "vivienda" ? "Venta" : propiedad.tipo === "terreno" ? "Lote" : "Alquiler";

    card.innerHTML = `
        <div class="card-img-wrapper">
            <span class="card-badge">${tipoBadge}</span>
            <img src="${propiedad.imagen || 'https://via.placeholder.com/600x400?text=Premium+Property'}" alt="${propiedad.titulo}">
        </div>
        <div class="property-info">
            <h3>${propiedad.titulo}</h3>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i> ${propiedad.ubicacion}
            </div>
            <div class="property-price">${propiedad.precio}</div>
            <div class="card-actions">
                ${
                    adminActivo
                    ? `
                    <button class="btn-card-edit" onclick="editarPropiedad(${propiedad.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-card-del" onclick="eliminarPropiedad(${propiedad.id})">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                    `
                    : `
                    <a class="btn-card-wsp" href="#" onclick="event.preventDefault(); abrirWhatsApp('${tituloLimpio}')">
                        <i class="fab fa-whatsapp"></i> Consultar Asesor
                    </a>
                    `
                }
            </div>
        </div>
    `;
    return card;
}

// ======================================
// MOSTRAR PROPIEDADES EN GRIDS
// ======================================
function mostrarPropiedades() {
    const terrenos = document.getElementById("contenedorTerrenos");
    const viviendas = document.getElementById("contenedorViviendas");
    const comerciales = document.getElementById("contenedorComerciales");

    if (terrenos) terrenos.innerHTML = "";
    if (viviendas) viviendas.innerHTML = "";
    if (comerciales) comerciales.innerHTML = "";

    propiedades.forEach(propiedad => {
        const card = crearTarjeta(propiedad);

        if (propiedad.tipo === "terreno" && terrenos) {
            terrenos.appendChild(card);
        } else if (propiedad.tipo === "vivienda" && viviendas) {
            viviendas.appendChild(card);
        } else if (propiedad.tipo === "comercial" && comerciales) {
            comerciales.appendChild(card);
        }
    });
}

// ======================================
// ACCIONES EDITAR / ELIMINAR
// ======================================
function editarPropiedad(id) {
    const propiedad = propiedades.find(p => p.id === id);
    if (!propiedad) return;

    document.getElementById("propertyId").value = propiedad.id;
    document.getElementById("titulo").value = propiedad.titulo;
    document.getElementById("precio").value = propiedad.precio;
    document.getElementById("ubicacion").value = propiedad.ubicacion;
    document.getElementById("imagen").value = propiedad.imagen;
    document.getElementById("tipo").value = propiedad.tipo;

    const panel = document.getElementById("panelAdmin");
    if (panel) panel.scrollIntoView({ behavior: "smooth" });
}

function eliminarPropiedad(id) {
    const confirmar = confirm("¿Está seguro de que desea eliminar esta propiedad del catálogo premium?");
    if (!confirmar) return;

    propiedades = propiedades.filter(p => p.id !== id);
    guardarDatos();
    mostrarPropiedades();
}

// ======================================
// FORMULARIO ADMINISTRADOR (SUBMIT)
// ======================================
const form = document.getElementById("propertyForm");
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const id = document.getElementById("propertyId").value;

        const nueva = {
            id: id ? Number(id) : Date.now(),
            titulo: document.getElementById("titulo").value,
            precio: document.getElementById("precio").value,
            ubicacion: document.getElementById("ubicacion").value,
            imagen: document.getElementById("imagen").value,
            tipo: document.getElementById("tipo").value
        };

        if (id) {
            const index = propiedades.findIndex(p => p.id == id);
            if (index !== -1) propiedades[index] = nueva;
        } else {
            propiedades.push(nueva);
        }

        guardarDatos();
        mostrarPropiedades();
        cancelarEdicion();

        const toast = document.getElementById("adminToast");
        if (toast) {
            toast.classList.remove("hidden");
            setTimeout(() => toast.classList.add("hidden"), 3500);
        } else {
            alert("Propiedad guardada correctamente.");
        }
    });
}

function cancelarEdicion() {
    if (form) form.reset();
    document.getElementById("propertyId").value = "";
}

// ======================================
// MENÚ RESPONSIVE MÓVIL
// ======================================
function toggleMenu() {
    const nav = document.querySelector("header nav");
    if (nav) nav.classList.toggle("open");
}

// ======================================
// ENVÍO FORMULARIO DE CONTACTO PÚBLICO
// ======================================
function enviarContacto(e) {
    e.preventDefault();
    const contactForm = document.getElementById("contactForm");
    const contactSuccess = document.getElementById("contactSuccess");

    if (contactForm && contactSuccess) {
        contactForm.classList.add("hidden");
        contactSuccess.classList.remove("hidden");

        setTimeout(() => {
            contactForm.reset();
            contactForm.classList.remove("hidden");
            contactSuccess.classList.add("hidden");
        }, 5000);
    }
}

// ======================================
// APIS EXTERNAS (WHATSAPP DIRECTO)
// ======================================
function abrirWhatsApp(nombre) {
    const mensaje = encodeURIComponent(`Hola Medrano Firma Inmobiliaria. Deseo recibir información personalizada sobre la propiedad: ${nombre}`);
    window.open(`https://wa.me/51982716628?text=${mensaje}`, "_blank");
}

// Cierre de ventanas modales haciendo clic fuera del marco
window.addEventListener("click", function(e) {
    const modal = document.getElementById("loginModal");
    if (e.target === modal) cerrarModal();
});

// ======================================
// INICIALIZACIÓN DE LA PLATAFORMA
// ======================================
document.addEventListener("DOMContentLoaded", function() {
    mostrarPropiedades();
});