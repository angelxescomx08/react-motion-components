import { FC, ReactNode, Children, useRef, useEffect, useState } from "react"
import { AnimatePresence, motion, Variants } from 'framer-motion'

import estilos from './estilos.module.css'

interface Props {
    children?: ReactNode;
}

const variants: Variants = {
    inicial: ({ duration, direccion }) => ({
        y: direccion === 'incrementando' ? 0  : -1024,
        transition: {
            duration
        }
    }),
    entrada: ({ duration, direccion }) => ({
        y: 0,
        transition: {
            duration
        }
    }),
    salida: ({ duration, direccion }) => ({
        y: direccion === 'incrementando' ? -1024 : 0,
        zIndex: direccion === 'incrementando' ? 100 : 0,
        transition: {
            duration
        }
    })
}

export const Pagepiling: FC<Props> = ({ children }) => {

    const [primera, setPrimera] = useState(true)
    const [pagina, setPagina] = useState(0)
    const animando = useRef(false)
    const [direccion, setDireccion] = useState('')

    useEffect(() => {
        const detectarCambio = (e: WheelEvent) => {
            const { deltaY } = e;
            if (!animando.current) {
                setPrimera(false)
                animando.current = true;
                if(deltaY > 0){
                    setDireccion('incrementando')
                    setPagina(pagina => pagina + 1)
                }else{
                    setDireccion('decrementando')
                    setPagina(pagina => pagina - 1)
                }
            }
        }
        document.addEventListener('wheel', detectarCambio)

        return () => document.removeEventListener('wheel', detectarCambio)
    }, [])

    const hijos = Children.map(children, (child) => child)

    return (

        <AnimatePresence
            custom={{
                duration: 1,
                direccion
            }}
        >
            {
                <motion.div
                    key={pagina}
                    className={estilos.contenedor}
                    variants={variants}
                    onAnimationComplete={(tipo) => {
                        if (tipo === 'salida') animando.current = false;
                    }}
                    custom={{
                        duration: .6,
                        direccion
                    }}
                    initial={primera ? "" : "inicial"}
                    animate="entrada"
                    exit="salida"
                >
                    {hijos![Math.abs(pagina) % hijos!.length]}
                </motion.div>
            }
        </AnimatePresence>
    )
}
