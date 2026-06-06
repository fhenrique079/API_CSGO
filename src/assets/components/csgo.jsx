import './csgo.css'
import { useState, useEffect } from "react";

const CsGo = props => {
    const [csgo, setcsgo] = useState([]);
    const [indiceAtivo, setIndiceAtivo] = useState(0); // Controla qual card aparece no meio

    function loadAPI() {
        let url = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/base_weapons.json';

        fetch(url)
            .then( (resultado) => resultado.json() )
            .then( (resjson)=> {
                console.log(resjson);
                setcsgo(resjson);
            })
    }

    useEffect( () => loadAPI(), []);

    const proximoCard = () => {
        setIndiceAtivo((prev) => (prev + 1) % csgo.length);
    };

    const cardAnterior = () => {
        setIndiceAtivo((prev) => (prev - 1 + csgo.length) % csgo.length);
    };

    if (csgo.length === 0) {
        return <div className="loading">Carregando armas...</div>;
    }

    return (
        <div className="divCarrosel">
            <button className="btn-scroll esq" onClick={cardAnterior}> ❮ </button>
            <div className="container">
                <div className="card">
                    <div className='card-header'>
                        <img src={csgo[indiceAtivo].image} alt={csgo[indiceAtivo].name} className="card-img-top"/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{csgo[indiceAtivo].name}</h5>
                        <p className="card-text">{csgo[indiceAtivo].description}</p>
                        <p className="card-category">
                            {csgo[indiceAtivo].category ? csgo[indiceAtivo].category.name : 'Sem categoria'}
                        </p>
                    </div>
                </div>
            </div>
            <button className="btn-scroll dir" onClick={proximoCard}> ❯ </button>
        </div>
    );
}

export default CsGo;