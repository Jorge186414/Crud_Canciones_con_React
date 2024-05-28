import { Alert } from 'bootstrap'
import React, { useState } from 'react'
import shortid from 'shortid'
import Swal from 'sweetalert2'

function Crud() {

    const [track, setTrack] = useState('')
    const [artista, setArtista] = useState('')
    const [genero, setGenero] = useState('')
    const [modoEditar, setModoEditar] = useState(false)
    const [canciones, setCanciones] = useState([])
    const [id, setId] = useState('')

    const limpiarHooks = () => {
        // Limpiar datos del hook
        setTrack('')
        setArtista('')
        setGenero('')
        setId('')
    }

    // Metodo para eliminar track
    const eliminarTrack = id => {
        // Buscar y filtrar el Id del registro
        // Si lo encuentra lo quita de la lista sin afectar a los demas registros
        const arrayFiltrado = canciones.filter(cancion => cancion.id != id)
        Swal.fire({
            title: "Estas seguro?",
            text: "No podras revertir el cambio",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Borrarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                setCanciones(arrayFiltrado)
                Swal.fire({
                    title: "Track Eliminado!",
                    text: "El registro de ha eliminado",
                    icon: "success"
                });
            }
        });
    }

    // Metodo para obtener los datos de la cancion a editar
    const editarTrack = (cancion) => {
        setModoEditar(true)
        // Modificamos los estados de los valores del track
        setTrack(cancion.cancion)
        setArtista(cancion.artist)
        setGenero(cancion.gen)
        // Se necesita tambien crear un estado para el ID y setear su valor
    }

    const editarTrackOk = (evt) => {
        evt.preventDefault()
        if (!track.trim()) {
            Swal.fire({
                title: "Canciones Tesji",
                text: "Debes ingresar un nombre de cancion",
                icon: "error"
            });
            return
        }
        if (!artista.trim()) {
            Swal.fire({
                title: "Canciones Tesji",
                text: "Debes ingresar un artista de cancion",
                icon: "error"
            });
            return
        }
        if (!genero.trim()) {
            Swal.fire({
                title: "Canciones Tesji",
                text: "Debes ingresar un genero para la cancion",
                icon: "error"
            });
            return
        }
        const arrayEditado = canciones.map(
            cancion => cancion.id == id ? {
                id: id,
                cancion: track,
                artist: artista,
                gen: genero
            } : cancion
        )
        setCanciones(arrayEditado)
        setModoEditar(false)
        limpiarHooks()
    }

    const guardarTrack = (evt) => {
        evt.preventDefault()
        if (!track.trim()) {
            Swal.fire({
                title: "Canciones Tesji",
                text: "Debes ingresar un nombre de cancion",
                icon: "error"
            });
            return
        }
        if (!artista.trim()) {
            Swal.fire({
                title: "Canciones Tesji",
                text: "Debes ingresar un artista de cancion",
                icon: "error"
            });
            return
        }
        if (!genero.trim()) {
            Swal.fire({
                title: "Canciones Tesji",
                text: "Debes ingresar un genero para la cancion",
                icon: "error"
            });
            return
        }
        Swal.fire({
            title: "Seguro que deseas agregar el Track a la lista",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No Guardar`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Agregado Correctamente!", "", "success");
                // Unir datos a la lista de canciones
                setCanciones(
                    [...canciones,
                    { id: shortid.generate(), cancion: track, artist: artista, gen: genero }]
                )
                limpiarHooks()
            } else if (result.isDenied) {
                Swal.fire("El Track no se agrego", "", "info");
            } else {
                // Limpieza de datos del formulario
                limpiarHooks()
            }
        });

    };

    return (
        <>
            <div className="container border border-primary p-4 mt-3 rounded-3">
                <h1 className='text-center'>Registro de Canciones</h1>
                <hr />
                <div className="row">
                    <div className='col-12 col-md-4 col-lg-3'>
                        <h3 className='text-center align-center'>Formulario</h3>
                        <form onSubmit={modoEditar ? editarTrackOk : guardarTrack}>
                            <input
                                type="text"
                                placeholder='Track'
                                className='form-control mb-3'
                                id='cancion'
                                onChange={(evt) => setTrack(evt.target.value)}
                                value={track}
                            />
                            <input
                                type="text"
                                placeholder='Artista'
                                className='form-control mb-3'
                                id='artistas'
                                onChange={(evt) => setArtista(evt.target.value)}
                                value={artista}
                            />
                            <input
                                type="text"
                                placeholder='Genero'
                                className='form-control mb-3'
                                id='genero'
                                onChange={(evt) => setGenero(evt.target.value)}
                                value={genero}
                            />
                            <button type='submit' className={`btn btn-block' ${modoEditar ? 'btn-warning' : 'btn-info'}`}>
                                {
                                    modoEditar ? 'Editar Cancion ' : 'Agregar Cancion'

                                }
                            </button>
                        </form>
                    </div>
                    <div className='col-12 col-md-8 col-lg-9'>
                        <h3>Lista de canciones</h3>
                        <ul className='list-group'>{
                            canciones.map((cancion, index) => (
                                <li key={index} className='list-group-item'>
                                    <span className='lead'> {cancion.cancion}, {cancion.artist}, {cancion.gen} </span>
                                    <button onClick={() => editarTrack(cancion)} className='btn btn-sm btn-warning float-right mx-2'>Editar</button>
                                    <button onClick={() => eliminarTrack(cancion.id)} className='btn btn-sm btn-danger float-right mx-2'>Eliminar</button>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Crud