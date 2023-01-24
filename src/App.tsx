import './App.css'
import { Slider } from './components'
import { Pagepiling } from './components/pagepiling'

import { imagenes } from './helpers'

function App() {

  return (
    <div>
      {/* <Slider></Slider> */}
      <Pagepiling>
        {imagenes.map(imagen => (
          <img 
            key={crypto.randomUUID()}
            src={imagen}
            alt=""
          />
        ))}
      </Pagepiling>
    </div>
  )
}

export default App
