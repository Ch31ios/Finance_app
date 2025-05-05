import "./CategoryManager.scss";
import React, { useState, useRef } from 'react';

function CategoryManager() {
  const [categorias, setCategorias] = useState(['Hogar', 'Viajes' , 'Alimentacion']);
  const inputRef = useRef();

  const eliminar = (nombre) => {
    setCategorias(categorias.filter(cat => cat !== nombre));
  };

  const agregar = () => {
    const nombre = inputRef.current.value;
    if (nombre) {
      setCategorias([...categorias, nombre]);
    }
    inputRef.current.value = ''; 
  };

  return (
    <div className="category-container">
      <h2>Categorías de Gastos</h2>
      <ul>
        {categorias.map((cat, index) => (
          <li key={index}>
            <span>{cat}</span>
            <button onClick={() => eliminar(cat)}>X</button>
          </li>
        ))}
      </ul>
      <div>
      <input type="text" ref={inputRef} />
        <button onClick={agregar}>Agregar categoría</button>
      </div>
    </div>
  );
}

export default CategoryManager;
