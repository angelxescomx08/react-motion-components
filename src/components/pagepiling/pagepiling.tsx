import { FC, ReactNode, Children, useRef, useEffect, useState } from "react"
import { AnimatePresence, motion, Variants } from 'framer-motion'

import estilos from './estilos.module.css'

interface Props {
    children?: ReactNode;
}

const variants: Variants = {
    inicial: ({ duration }) => ({
        top: -1024,
        transition: {
            duration
        }
    }),
    entrada: ({ duration }) => ({
        top: 0,
        transition: {
            duration
        }
    }),
    salida: ({ duration }) => ({
        top: 0,
        transition: {
            duration
        }
    })
}

export const Pagepiling: FC<Props> = ({ children }) => {

    const [pagina, setPagina] = useState(0)
    const [animando, setAnimando] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const detectarCambio = (e: WheelEvent) => {
            const { deltaY } = e;
            if(!animando){
                setAnimando(true)
                deltaY > 0 ? setPagina(pagina => pagina + 1) : setPagina(pagina => pagina - 1)
            }
        }
        ref.current?.addEventListener('wheel', detectarCambio)

        return () => ref.current?.removeEventListener('wheel', detectarCambio)
    }, [])

    const hijos = Children.map(children, (child) => child)

    return (
        <div ref={ref}>
            <AnimatePresence>
                {
                    <motion.div
                        key={pagina}
                        className={estilos.contenedor}
                        variants={variants}
                        onAnimationComplete={()=>setAnimando(false)}
                        custom={{
                            duration: 1
                        }}
                        initial="inicial"
                        animate="entrada"
                        exit="salida"
                    >
                        {hijos![Math.abs(pagina) % hijos!.length]}
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}
