import { useState } from 'react'

import { motion } from 'framer-motion'

import { imagenes } from '../../helpers'

import estilos from './estilos.module.css'

export const Slider = () => {

    const [count, setCount] = useState(0)
    const [last, setLast] = useState(0)

    const next = () => {
        setLast(-1)
        setCount(count + 1)
    }
    const previous = () => {
        setLast(1)
        setCount(count - 1)
    }

    return (
        <div>
            <button className={estilos.button} onClick={previous}>Previous</button>
            <button className={estilos.button} onClick={next}>Next</button>

            <div className={estilos.contenedor}>
                <motion.img
                    key={count}
                    initial={{ x: last* 1280 }}
                    animate={{ x: 0 }}
                    src={imagenes[Math.abs(count) % 3]}
                    alt=""
                />

            </div>

        </div>
    )
}
