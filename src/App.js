import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  // state de la app
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaactual, GuardarPaginaActual ] = useState(1);
  const [ totalpaginas, GuardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI =async () => {
      if(busqueda === '' ) return;

    const imagenesPorPagina = 30;
    const key = '16376680-9f51841534451cdc3a47f587a';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();


    guardarImagenes(resultado.hits);

    // calcular el total de paginas 
    const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina );
    GuardarTotalPaginas(calcularTotalPaginas);
  
    // Mover la pantalla hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth'})

    }
    consultarAPI();
  }, [busqueda, paginaactual]);

  
  // definir la pagina anterior 
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual -1;

    if(nuevaPaginaActual === 0 ) return;

    GuardarPaginaActual(nuevaPaginaActual);
  }

  // definir la pagina siguiente 
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual +1;
    
    if(nuevaPaginaActual > totalpaginas ) return;
    
    GuardarPaginaActual(nuevaPaginaActual);
  }
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="led text-center">Buscador de Imagenes</p>

        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
          <ListadoImagenes 
            imagenes={imagenes}
          />
         { (paginaactual === 1 ) ? null : (
            <button 
                type="button"
                className="bbtn btn-info mr-1"
                onClick={paginaAnterior}
              >&laquo; Anterior  
          </button>
         )}
         { ( paginaactual === totalpaginas ) ? null : (
            <button 
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo;
         </button>
         )}
      </div>
    </div>
    
  );
}

export default App;
