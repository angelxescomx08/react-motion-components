import './App.css'
import { Slider } from './components'
import { Pagepiling } from './components/pagepiling'

import { imagenes } from './helpers'

function App() {

  return (
    <>
      {/* <Slider></Slider> */}
      <Pagepiling>
        {imagenes.map((imagen,i) => (
          <img 
            key={i}
            src={imagen}
            alt=""
          />
        ))}
      </Pagepiling>
    </>
  )
}

export default App
