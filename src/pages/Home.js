import React from "react"
import { Link } from 'react-router-dom';


import '../styles/home.scss'

export function Home() {
    return (
        <div id='Homepage'>
            <div className='summary-text'>
                <h3 className='marvel-characters'>A Marvel é responsável por algumas das maiores franquias de heróis atuais, incluindo:</h3>
                <h3 className='marvel-history'>Fundada em 1939 por Martin Goodman, a Marvel Comics é atualmente considerada a maior editora de histórias em quadrinhos do mundo.</h3>
            </div>
            <div className='links'>
                <Link to='/galeria'>
                    <div className='Galeria'>
                        <h1 className='gallery-name'>GALERIA</h1>
                        <h3 className='gallery-text'>Aqui você pode visualizar todos os personagens da Marvel e suas características</h3>
                    </div>
                </Link>
                <Link to='/oficina'>
                    <div className='Oficina'>
                        <h1 className='office-name'>OFICINA</h1>
                        <h3 className='office-text'>Monte o seu próprio personagem ou edite um existente!</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}