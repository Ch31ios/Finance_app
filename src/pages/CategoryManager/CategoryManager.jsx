import "./CategoryManager.scss";

import Menu from "../../components/Menu/Menu.jsx";

import { useRef, useState } from 'react';

function CategoryManager() {
  const [categorias, setCategorias] = useState(['Hogar', 'Viajes', 'Alimentacion']);
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
    <div className="category-manager">

      <Menu />

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
    </div>
  );
}

export default CategoryManager;
