import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

/*const musicasLocal = [{
    artist: "Artista 1",
    id: "1",
    name: "Musica1",
    url: "http://spoti4.future4.com.br/1.mp3"
},
{
    artist: "Artista 2",
    id: "2",
    name: "Musica2",
    url: "http://spoti4.future4.com.br/2.mp3"
},
{
    artist: "Artista 3",
    id: "3",
    name: "Musica3",
    url: "http://spoti4.future4.com.br/3.mp3"
}]*/



export default function Musicas(props) {


    const [musicas, setMusicas] = useState([])
    const [name, setName] = useState("")
    const [artist, setArtist] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        getPlayListTracks()
    }, [])

    //exercício 3 modificando o local de onde as músicas estão vindo(pegando as músicas da playlist)
    const getPlayListTracks = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
            { headers: { Authorization: "rafael-machado-barbosa" } })
            .then((res) => {
                setMusicas(res.data.result.tracks)
            })
            .catch((err) => console.log(err.response))
    }

    //exercício 4 adicionar músicas na playList
    const body = {
        name: name,
        artist: artist,
        url: url
    }

    const addTrack = () => {
        axios
            .post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
                body, { headers: { Authorization: "rafael-machado-barbosa" } }
            )
            .then((res) => {
                console.log(res.data)
                alert("Música adicionada com sucesso")
                setName("")
                setArtist("")
                setUrl("")
                getPlayListTracks()
            })
            .catch(err => console.log(err.response))
    }

    //Exercício 5 deletando música

    const deleteTrack = (id) => {
        axios
            .delete(
                `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`,
                { headers: { Authorization: "rafael-machado-barbosa" } }
            )
            .then((res) => {
                alert("Música deletada com sucesso")
                getPlayListTracks()
            })
            .catch((err) => console.log(err.response))
    }




    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={() => deleteTrack(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" onChange={(e) => setArtist(e.target.value)} />
                <InputMusica placeholder="musica" onChange={(e) => setName(e.target.value)} />
                <InputMusica placeholder="url" onChange={(e) => setUrl(e.target.value)} />
                <Botao onClick={addTrack}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

