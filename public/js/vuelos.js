var url = "http://localhost:3000/api/v1/vuelos";

$().ready(() => {
    cargatabla();
});
var cargatabla = () => {
    var html = "";
    $.get(url, (vuelos) => {

        $.each(vuelos, (index, val) => {
            html += "<tr>" + "<td>" + (
                index + 1
            ) + "</td>" + "<td>" + val.piloto + "</td>" + "<td>" + val.avion + "</td>" + "<td>" + val.destino + "</td>" + "<td>" + val.fecha + "</td>" + "<td>" + "<button class='btn btn-success' onclick=uno('" + val._id + "')>Editar</button>" + "<button class='btn btn-danger' onclick=eliminar('" + val._id + "')>Eliminar</button>" + "</td>" + "</tr>";
        });
        $('#cuerpoVuelos').html(html);
    });
}

var eliminar = (id) => {
    Swal.fire({
        title: 'Vuelos',
        text: "Esta seguro de eliminar al vuelos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + '/' + id,
                type: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                success:(mensaje)=>{
                   cargatabla();
                   limpiaCajas();
                    Swal.fire('Vuelos',  mensaje.msg, 'success')
                }

            });
            
        }
    })
}
var guardaryEditar = () => {
    var piloto = document.getElementById('piloto').value;
    var avion = document.getElementById('avion').value;
    var destino = $('#destino').val();
    var fecha = $('#fecha').val();
    var id = document.getElementById('_id').value;
    if (id != '') { // TODO:Editar vuelos
        var tipoEnvio = "PUT";
        var VuelosDTO = {
            _id: id,
            piloto: piloto,
            avion: avion,
            destino: destino,
            fecha: fecha
        }
        url = url + "/" + id;
    } else { // TODO:Nuevo vuelos
        var tipoEnvio = "POST";
        var VuelosDTO = {
            piloto: piloto,
            avion: avion,
            destino: destino,
            fecha: fecha
        }
    }
    $.ajax({
        url: url,
        type: tipoEnvio,
        data: JSON.stringify(VuelosDTO),
        processData: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: (IVuelos) => {
            if (IVuelos) {
                alert('Se guardo con exito');
                cargatabla();
                limpiaCajas();
            } else {
                console.log(IVuelos);
                alert('error al guardar');
                limpiaCajas();
            }
        }
    });
}

var uno = (id) => {
    $.get(url + "/" + id, (unVuelo) => {

        if (unVuelo) {
            $('#_id').val(id);
            $('#piloto').val(unVuelo.piloto);
            document.getElementById('piloto').value = unVuelo.piloto;
            $('#avion').val(unVuelo.avion);
            $('#destino').val(unVuelo.destino);
            $('#idModal').html('Editar Vuelo')
            $('#ModalVuelo').modal('show');
        } else {
            alert('error, no se encuentra al vuelo');
            console.log(unVuelo);
        }
    })
}


var limpiaCajas = () => {
    $('#_id').val('');
    $('#piloto').val('');
    document.getElementById('avion').value = '';
    $('#destino').val('');
    $('#fecha').val('');
    $('#ModalUsuarios').modal('hide');
}
