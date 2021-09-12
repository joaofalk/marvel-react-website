import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/header.scss'

export default function Header() {
    return (
        <nav className='Header'>
            <Link to='/'>
                <section className='MarvelHome'>
                    <h1>MARVEL</h1>
                </section>
            </Link>
            <ul className="nav-links">
                <Link to='/galeria'>
                    <li className='Galeria'>Galeria</li>
                </Link>
                <Link to='/oficina'>
                    <li className='Oficina'>Oficina</li>
                </Link>
            </ul>
        </nav>
    )
}