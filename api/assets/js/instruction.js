// carga inicial de los registros cuando se carga el DOM
function carga_data() {
    fetch('http://127.0.0.1:8000/api/alumnos')
        .then(response => response.json())
        .then(registros => {
            console.log(registros);
            if (Object.entries(registros).length == 0) {
                let valores = document.getElementById('contenido');
                contenido.innerHTML += `
                    <tr>
                        <td class="text-center" colspan="4">Sin Registros </td>
                    </tr>
                `
            } else {
                for (let dato of registros) {
                    tabla(dato)
                }
            }
        })
}

// proceso que se encarga los datos en la tabla HTML
function tabla(dato) {
    let contenido = document.getElementById('contenido');
    contenido.innerHTML += `
        <tr>
            <td>${dato.idAlumno}</td>
            <td>${dato.nombre}</td>
            <td>${dato.apellido}</td>
            <td>${dato.correo}</td>
        </tr>
    `
}


// proceso que me permite hacer el registro de los Alumnos
let enviar = document.getElementById('enviar');
enviar.addEventListener('click', () => {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let correo = document.getElementById('correo').value;

    if (nombre == '') {
        alert('Debe ingresar el nombre')
        document.getElementById('nombre').focus();
        document.getElementById('nombre').style.borderBlockColor = 'red';
        return
    }
    clearBorder();

    if (apellido == '') {
        alert('Debe ingresar el apellido');
        document.getElementById('apellido').focus();
        document.getElementById('apellido').style.borderBlockColor = 'red';
        return
    }
    clearBorder();

    if (correo == '') {
        alert('Debe ingresar el correo')
        document.getElementById('correo').focus();
        document.getElementById('correo').style.borderBlockColor = 'red';
        return;
    }
    clearBorder();
    clear();

    const alumno = {
        nombre: nombre,
        apellido: apellido,
        correo: correo
    }

    fetch('http://127.0.0.1:8000/api/alumnos', {
        method: 'post',
        body: JSON.stringify(alumno),
        headers: {
            'Content-type': 'aplication/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            alert(json.mensaje);
            location.reload();
        })
})

//proceso que me limpia el formulario para volverlo a utilizar
function clear() {
    document.getElementById('formulario_registro').reset();
}

//proceso que limpia las alertas de los campos faltantes
function clearBorder() {
    document.getElementById('nombre').style.borderBlockColor = '';
    document.getElementById('apellido').style.borderBlockColor = '';
    document.getElementById('correo').style.borderBlockColor = '';
}

