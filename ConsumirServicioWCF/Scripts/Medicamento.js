
window.onload = function () {
    ListarMedicamentos();
    ListarFormaFarmaceutica();
}
/**Funcion para hacer la peticion al servicio web para listar en la tabla */
const ListarMedicamentos = () => {
    fetch("Medicamento/ListarMedicamentos")
        .then(response => response.json())
        .then(data => {
            LoadData(data);
        });
}
/**Funcion para hacer la peticion al servicio web para listar en el select */
const ListarFormaFarmaceutica = () => {
    fetch("Medicamento/ListarFormaFarmaceutica")
        .then(response => response.json())
        .then(data => {
            llenarCombo(data);
        });
}
/**
 * Funcion para listar los datos en una tabla
 * @param {any} data parametro tipo array de objetos
 */
const LoadData = (data) => {
    let contenido = "";

    contenido += "<table class='table table-striped'>";
    contenido += "<thead class='thead-dark'>";
    //definimos las fila de encabezado
    contenido += "<tr>";
    contenido += "<th>Id</th>";
    contenido += "<th>Nombre</th>";
    contenido += "<th>Concentracion</th>";
    contenido += "<th>Forma Farmaceutica</th>";
    contenido += "<th>Stock</th>";
    contenido += "<th>Precio</th>";
    contenido += "<th>Presentacion</th>";
    contenido += "<th>Acciones</th>";
    contenido += "</tr>";
    contenido += "</thead>";
    //contenido
    contenido += "<tbody>";
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        contenido += "<tr>";

        contenido += "<td>" + item.iidmedicamento + "</td>";
        contenido += "<td>" + item.nombre + "</td>";
        contenido += "<td>" + item.concentracion + "</td>";
        contenido += "<td>" + item.nombreFormaFarmaceutica + "</td>";
        contenido += "<td>" + item.stock + "</td>";
        contenido += "<td>" + item.precio + "</td>";
        contenido += "<td>" + item.presentacion + "</td>";
        contenido += "<td><input type='button' class='btn btn-primary' onclick='AbrirModal(" + item.iidmedicamento + ")' data-toggle='modal' data-target='#exampleModal' value='Editar'/> ";
        contenido += "<input type='button' class='btn btn-danger' value='Eliminar'/></td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.querySelector('#tabla').innerHTML = contenido;
}

/**
 * Funcion para cambiar el titulo del modal segun la accion
 * @param {any} iidMedicamento parametro tipo entero
 */
const AbrirModal = (iidMedicamento) => {
    CleanData();
    if (iidMedicamento == 0) {
        document.getElementById('lblTitulo').innerHTML = "Agregar Medicamento";
    }
    else {
        document.getElementById('lblTitulo').innerHTML = "Editar Medicamento";

        fetch("Medicamento/RecuperarMedicamento/?iidMedicamento=" + iidMedicamento)
            .then(response => response.json())
            .then(data => {
                document.getElementById("txtIdMedicamento").value = data.iidmedicamento;
                document.getElementById("txtNombre").value = data.nombre;
                document.getElementById("txtConcentracion").value = data.concentracion;
                document.getElementById("cboformaFarmaceutica").value = data.iidformafarmaceutica;
                document.getElementById("txtPrecio").value = data.precio;
                document.getElementById("txtStock").value = data.stock;
                document.getElementById("txtPresentacion").value = data.presentacion;
            });
    }
}
///
document.querySelector('#btnGuardarCambios').addEventListener('click', e => {
    e.preventDefault();
    GuardarCambios();
});

/** */
const GuardarCambios = () => {
    let objeto = DataValidation();
    if (objeto.exito == false) {
        document.getElementById("divErrors").innerHTML = objeto.contenido;
    }
    else {
        document.getElementById("divErrors").innerHTML = "";
    }
}
/** */
const DataValidation = () => {
    let exito = true;
    let contenido = "<ol style='color:red'>";
    let required = document.getElementsByClassName("required");
    for (let i = 0; i < required.length; i++) {
        if (required[i].value === "") {
            exito = false;
            contenido += "<li>" + required[i].name + " es obligatorio</li>";
        }
    }
    contenido += "</ol>";
    return { exito, contenido };
}
/**
 * Funcion para llenar un select
 * @param {any} data parametro tipo array de objetos
 */
const llenarCombo = (data) => {
    let contenido = "";
    contenido += "<option value='0'>-- Seleccione una opcion --</option>";
    for(let i = 0; i < data.length; i++) {
        let item = data[i];
        contenido += "<option value='" + item.iidformafarmaceutica + "'>" + item.nombreFormaFarmaceutica + "</option>";
    }
    document.querySelector('#cboformaFarmaceutica').innerHTML = contenido;
}
/**Funcion para limpiar los campos del formulario */
const CleanData = () => {
    let clear = document.getElementsByClassName('clear');
    for (let i = 0; i < clear.length; i++) {
        if (clear[i].tagName == "SELECT") {
            console.log(clear[i].tagName);
        }
        else {
            clear[i].value = "";
        }
    }
}
