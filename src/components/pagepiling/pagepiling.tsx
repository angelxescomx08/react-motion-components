import { FC, ReactNode, Children, useRef, useEffect, useState } from "react"
import { AnimatePresence, motion, Variants } from 'framer-motion'

import estilos from './estilos.module.css'

interface Props {
    children?: ReactNode;
}

const variants: Variants = {
    inicial: {
        top: -1024,
    },
    entrada: {
        top: 0,
    },
    salida: {
        top: -1024
    }
}

export const Pagepiling: FC<Props> = ({ children }) => {

    const [pagina, setPagina] = useState(0)
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const detectarCambio = (e: WheelEvent) => {
            const { deltaY } = e;
            deltaY > 0 ? setPagina(pagina => pagina + 1) : setPagina(pagina => pagina + 1)
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
