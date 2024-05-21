import React, { useState } from 'react'

function Crud() {

    const [track, setTrack] = useState('')
    const [artista, setArtista] = useState('')
    const [genero, setGenero] = useState('')
    const [canciones, setCanciones] = useState([])

    const guardarTrack = (evt) => {
        evt.preventDefault()
        if (!track.trim()) {
            alert("Debes ingresar un nombre de cancion")
            return
        }
        if (!artista.trim()) {
            alert("Debes ingresar un Artista")
            return
        }
        if (!genero.trim()) {
            alert("Debes ingresar un genero para la cancion")
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
            <div className="container border border-primary p-4 mt-3 rounded-3 text-center">
                <h1>Registro de Canciones</h1>
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
                    <button type='submit' className='btn btn-success' >Agregar Cancion</button>
                </form>
                <hr />
                <h3>Lista de canciones</h3>
                <ol>{
                    canciones.map((cancion, index) => (
                        <li key={index}>{cancion.cancion}, {cancion.artist}, {cancion.gen}</li>
                    ))
                }
                </ol>
            </div>

        </>
    )
}

export default Crud