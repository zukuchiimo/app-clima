import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
//El fragment se exportar para meter mar de una etiqueta en una respuesta

    // state del formulario
  const [busqueda, guardarBusqueda] = useState({ 
      ciudad: '',
      pais: ''
  });
  // states
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {

        if(consultar) {
          //el appId es unico viene de mi registro a openweathermap
          const appId = 'c11a5e2033f0f29d1b7944c7a5563668';
          // con template staring mando la ciudad y pais que obtebe
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
          //Espero la respuesta de la peticion
          const respuesta = await fetch(url);
        
          const resultado = await respuesta.json();
          //asigno a guardarResultado el valor de rssultado
          guardarResultado(resultado);
          guardarConsultar(false);

          // checo si hubo resultados 

          if(resultado.cod === "404") {
              guardarError(true);
          } else {
              guardarError(false);
          }
        }
        
    }
    consultarAPI();
   
  },[consultar]);

  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima 
                    resultado={resultado}
                />
  }



  return (
    <Fragment>
        <Header 
          titulo='Clima React App'
        />

        <div className="contenedor-form">
            <div className="container">
                <div className="row">
                    <div className="col m6 s12">
                        <Formulario 
                          busqueda={busqueda}
                          guardarBusqueda={guardarBusqueda}
                          guardarConsultar={guardarConsultar}
                        />
                    </div>
                    <div className="col m6 s12">
                        {componente}
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
}

export default App;
