import React, { useState, useEffect, useRef, useCallback } from "react";
import { Scrollbars } from 'react-custom-scrollbars'

import '../styles/gallery.scss'
import axios from "axios";
const md5 = require('md5')

function Gallery() {

    const [query, setQuery] = useState('')
    const [offsetNumber, setOffsetNumber] = useState(0)
    const [selectedCharacter, setSelectedCharacter] = useState([])
    const [characters, setCharacters] = useState([])
    const [hasMore, setHasMore] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setCharacters([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        // setSelectedCharacter([])
        let cancel
        let timestamp = Date.now()
        let hash = md5(`${timestamp}${process.env.REACT_APP_MARVEL_PRIVATE_KEY}${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`)
        axios({
            method: 'GET',
            url: 'https://gateway.marvel.com:443/v1/public/characters',
            params: {
                ts: timestamp,
                apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,
                hash: hash,
                ...(query ? { nameStartsWith: query } : {}),
                offset: offsetNumber
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setCharacters(prevCharacters => {
                return [...new Set([...prevCharacters, ...res.data.data.results])]
            })
            setHasMore(res.data.data.results.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, offsetNumber])

    // useEffect(() => { }, [selectedCharacter])

    const observer = useRef()
    const lastCharElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setOffsetNumber(prevOffsetNumber => prevOffsetNumber + 20)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    function handleChange(e) {
        setQuery(e.target.value)
        setOffsetNumber(0)
    }

    function handleClick(e) {

        let charId = ''
        if (e.target.id === '') {
            charId = e.target.parentNode.id;
        } else if (e) {
            charId = e.target.id;
        }
        let timestamp = Date.now()
        let hash = md5(`${timestamp}${process.env.REACT_APP_MARVEL_PRIVATE_KEY}${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`)
        axios({
            method: 'GET',
            url: `https://gateway.marvel.com:443/v1/public/characters/${charId}`,
            params: {
                ts: timestamp,
                apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,
                hash: hash,
            },
        }).then(res => {
            setSelectedCharacter(res.data.data.results[0])
        })
    }

    console.log('Selected characted length: ', selectedCharacter.length);
    return (
        <div id='gallery'>
            <div className="side-bar">
                {selectedCharacter.length === 0
                    ? <p className="side-bar-text">
                        Selecione um personagem para fazer suas informações aparecerem aqui.
                    </p>
                    : <Scrollbars className='side-bar-scrolling' autoHide>
                        <div className='character-data'>
                            <h1 className="character-name">{selectedCharacter.name}</h1>
                            <hr />
                            <img src={selectedCharacter.thumbnail.path + '.' + selectedCharacter.thumbnail.extension} />
                            <hr />
                            <h3 className='series-title'>Séries</h3>
                            <hr />
                            <div className='series-list'>
                                {selectedCharacter.series.items.map((series) => (
                                    <h6 className='series-name'>{series.name}</h6>
                                ))}
                            </div>
                        </div>
                    </Scrollbars>

                }

            </div>

            <div className='search-bar'>
                <input type='text' placeholder='Procure por um personagem aqui' onChange={handleChange} />
            </div>

            <div className='main-content'>
                {characters.map((character, index) => {
                    if (characters.length === index + 1) {
                        return <div className='character-icon' key={character.id} id={character.id} ref={lastCharElementRef} onClick={handleClick}>
                            <img src={character.thumbnail.path + '.' + character.thumbnail.extension} />
                            <h1>{character.name.toUpperCase()}</h1>
                        </div>

                    } else {
                        return <div className='character-icon' key={character.id} id={character.id} onClick={handleClick}>
                            <img src={character.thumbnail.path + '.' + character.thumbnail.extension} />
                            <h1>{character.name.toUpperCase()}</h1>
                        </div>
                    }
                })}
            </div>
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
        </div >
    );

}



export default Gallery;