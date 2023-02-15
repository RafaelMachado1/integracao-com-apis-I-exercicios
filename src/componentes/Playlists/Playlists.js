import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

/*const playlistsLocal = [
    {
        id: 1,
        name: "Playlist 1"
    },
    {
        id: 2,
        name: "Playlist 2"
    },
    {
        id: 3,
        name: "Playlist 3"
    },
    {
        id: 4,
        name: "Playlist 4"
    },
]*/


// Exercício 2 - consumindo playList da API
function Playlists() {
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        getAllPlayList();
    }, []);

    const getAllPlayList = () => {
        axios
            .get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
                { headers: { Authorization: "rafael-machado-barbosa" } }
            )
            .then((response) => {
                setPlaylists(response.data.result.list)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    // exercício 3 do exercício passado para casa Integração APIs II
    //nova sintaxe async, await e try/catch
    const [pesquisa, setPesquisa] = useState("")
    const searchPlayList = async (pesquisa) => {
        try {
            const response = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${pesquisa}`,
                { headers: { Authorization: "rafael-machado-barbosa" } }
            )

            console.log(response)
            setPlaylists(response.data.result.playlist)
            setPesquisa("")
        }
        catch (error) {
            console.log(error.response)
        }
    }

    //Exercício 4 Deletar uma playList
    //nova sintaxe async, await e try/catch
    const deletePlayList = async (id) => {
        try {
            const resposta = await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`,
                { headers: { Authorization: "rafael-machado-barbosa" } })
            console.log(resposta)
            alert("playList deletada com sucesso")
            getAllPlayList()

        }
        catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div>
            <input
                placeholder="Digite o nome da Playlist"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
            />
            <button onClick={() => searchPlayList(pesquisa)}>Pesquisar</button>
            <button onClick={getAllPlayList}>Voltar</button>

            {playlists.map((playlist) => {
                return <>
                    <Musicas key={playlist.id} playlist={playlist} />
                    <button onClick={() => deletePlayList(playlist.id)}>Excluir</button>
                </>
            })}

        </div>
    );
}

export default Playlists;