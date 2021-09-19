import React, { useEffect, useState } from "react"

import '../styles/office.scss'


export default function Office() {

    const [isHero, setIsHero] = useState(false)
    const [isVillain, setIsVillain] = useState(false)
    const [createdChars, setCreatedChars] = useState(JSON.parse(localStorage.getItem('createdChars')) || [])
    const [selectedChar, setSelectedChar] = useState([])
    const [inputsData, setInputsData] = useState({
        name: 'Qual o nome do seu personagem?',
        power: 'Qual o seu super poder?',
        enemy: 'Qual o nome do seu arque-inimigo?'
    })

    useEffect(() => {
        if (selectedChar) {
            setIsVillain(selectedChar.villain)
            setIsHero(selectedChar.hero)
            setInputsData({
                name: selectedChar.name,
                power: selectedChar.power,
                enemy: selectedChar.enemy,
            })
        } else {

            clearForm()
        }
    }, [selectedChar])

    function clearForm() {
        setIsVillain(false)
        setIsHero(false)
        setInputsData({
            name: 'Qual o nome do seu personagem?',
            power: 'Qual o seu super poder?',
            enemy: 'Qual o nome do seu arque-inimigo?'
        })
    }

    useEffect(() => {
        localStorage.setItem('createdChars', JSON.stringify(createdChars))
        clearForm()
    }, [createdChars])

    function handleClick(e) {
        if (e.target.className.includes('hero')) {
            setIsHero(true)
            setIsVillain(false)
        } else {
            setIsHero(false);
            setIsVillain(true);
        }
    }

    function handleSelect(e) {

        const localChars = JSON.parse(localStorage.getItem('createdChars'));
        const selectedChar = localChars.filter(character => character.name === e.target.value)

        setSelectedChar(selectedChar[0]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const char = {
            name: e.target[0].value,
            power: e.target[1].value,
            enemy: e.target[2].value,
            hero: isHero,
            villain: isVillain
        }
        setCreatedChars(prevCratedCharacters => {
            return [...new Set([...prevCratedCharacters, char])]
        })
    }

    function handleChange(e) {
        const field = e.target.id.split('-')[1]
        if (field === 'name') {
            setInputsData({
                name: e.target.value
            })
        } else if (field === 'power') {
            setInputsData({
                power: e.target.value
            })
        } else if (field === 'enemy') {
            setInputsData({
                enemy: e.target.value
            })
        }
    }

    function handleInputClick(e) {
        const field = e.target.id.split('-')[1]
        if (field === 'name') {
            setInputsData({
                name: ''
            })
        } else if (field === 'power') {
            setInputsData({
                power: ''
            })
        } else if (field === 'enemy') {
            setInputsData({
                enemy: ''
            })
        }
    }

    function deleteChar(e) {

        e.preventDefault()

        const updatedCharList = createdChars.filter(character => character.name !== inputsData.name)

        setCreatedChars(updatedCharList)


    }

    return (
        <div id='office'>
            <span className='office-title'>CRIE SEU PERSONAGEM!</span>
            <select className='created-history' onChange={handleSelect} defaultValue='defaultValue'>
                <option value='defaultValue' key='default'>Selecione um dos seus personagens</option>
                {createdChars.map((character) => {
                    return <option value={character.name} key={character.name}>{character.name}</option>
                })}
            </select>
            <form className='form' onSubmit={handleSubmit}>
                <span className='hero-or-villain'>Você é um herói ou um vilão?</span>
                <div className='fate-chooser'>
                    <div className={`hero${!isHero ? '' : '-chosen'}`} onClick={handleClick} >
                        <img src={'http://i.annihil.us/u/prod/marvel/i/mg/2/d0/5232190d42df2.jpg'} alt='hero-icon' className='hero-icon' />
                        <h1 className='hero-text'>Herói</h1>
                    </div>
                    <div className={`villain${!isVillain ? '' : '-chosen'}`} onClick={handleClick} >
                        <img src={'http://i.annihil.us/u/prod/marvel/i/mg/6/40/5274137e3e2cd.jpg'} alt='villain-icon' className='villain-icon' />
                        <h1 className='villain-text'>Vilão</h1>
                    </div>
                </div>
                <input type='text' id='character-name' className='text-inputs' value={inputsData.name} onChange={handleChange} onClick={handleInputClick} />
                <input type='text' id='character-power' className='text-inputs' value={inputsData.power} onChange={handleChange} onClick={handleInputClick} />
                <input type='text' id='character-enemy' className='text-inputs' value={inputsData.enemy} onChange={handleChange} onClick={handleInputClick} />
                <div className='button-div'>
                    <button >ENVIAR</button>
                    <button onClick={deleteChar}>DELETAR</button>
                </div>
            </form>
        </div>
    )
}