import React, { useState, useEffect } from "react";

import '../styles/gallery.scss'
const md5 = require('md5')
const axios = require('axios')

function Gallery() {
    useEffect(() => {
        fetchItems()
    }, []);

    console.log('Right before useState');

    const [characters, setCharacters] = useState([])

    const fetchItems = async () => {

        let timestamp = Date.now()
        let hash = md5(`${timestamp}${process.env.REACT_APP_MARVEL_PRIVATE_KEY}${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`)

        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${hash}`)
        const data = await response.data
        setCharacters(data.data.results)

    };
    console.log('Characters: ', characters);

    return (
        <div id='gallery'>
            <div className="side-bar">
                <p className="side-bar-text">
                    Selecione um personagem para fazer suas informações aparecerem aqui.
                </p>
            </div>
            <div className='main-content'>
                {characters.map(character => (
                    <div className='character-icon' key={character.id}>
                        <img src={character.thumbnail.path + '.' + character.thumbnail.extension} />
                        <h1>{character.name.toUpperCase()}</h1>
                    </div>
                ))}
            </div>
        </div >
    );

}



export default Gallery;