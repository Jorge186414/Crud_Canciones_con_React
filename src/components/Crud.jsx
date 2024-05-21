import React, { useState } from 'react'
import Swal from 'sweetalert2'

function Crud() {

    const [track, setTrack] = useState('')
    const [artista, setArtista] = useState('')
    const [genero, setGenero] = useState('')
    const [canciones, setCanciones] = useState([])

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
        console.log(`Procesando datos... 
        Cancion: ${track}
        Artista: ${artista}
        Genero: ${genero}`)
        // Unir datos a la lista de canciones
        setCanciones(
            [...canciones,
            { cancion: track, artist: artista, gen: genero }]
        )
        // Limpiar datos del hook
        setTrack('')
        setArtista('')
        setGenero('')
        // Limpieza de datos del formulario
        evt.target.reset()
    }

    return (
        <>
            <div className="container border border-primary p-4 mt-3 rounded-3">
                <h1 className='text-center'>Registro de Canciones</h1>
                <div className="row">
                    <div className='col-12 col-md-4 col-lg-3'>
                        <h3 className='text-center'>Formulario</h3>
                        <form onSubmit={guardarTrack}>
                            <input
                                type="text"
                                placeholder='Track'
                                className='form-control mb-3'
                                onChange={(evt) => setTrack(evt.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Artista'
                                className='form-control mb-3'
                                onChange={(evt) => setArtista(evt.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Genero'
                                className='form-control mb-3'
                                onChange={(evt) => setGenero(evt.target.value)}
                            />
                            <button type='submit' className='btn btn-info btn-block' >Agregar Cancion</button>
                        </form>
                    </div>
                    <div className='col-12 col-md-8 col-lg-9'>
                        <h3>Lista de canciones</h3>
                        <ul className='list-group'>{
                            canciones.map((cancion, index) => (
                                <li key={index} className='list-group-item'>
                                    <span className='lead'>  {cancion.cancion}, {cancion.artist}, {cancion.gen} </span>
                                    <button className='btn btn-sm btn-warning float-right mx-2'>Editar</button>
                                    <button className='btn btn-sm btn-danger float-right mx-2'>Eliminar</button>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Crud